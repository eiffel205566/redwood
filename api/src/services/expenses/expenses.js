import { db } from 'src/lib/db'
const EXPENSENS_PER_PAGE = 5
// import { EXPENSENS_PER_PAGE } from 'web/src/components/Misc/Constant'

export const expensePage = ({ page = 1, user }) => {
  const offset = (page - 1) * EXPENSENS_PER_PAGE

  return {
    myExpenses: db.expense.findMany({
      where: { user },
      take: EXPENSENS_PER_PAGE,
      skip: offset,
      orderBy: { createdAt: 'desc' },
      include: {
        tags: true,
        expenseType: {
          include: {
            tags: true,
          },
        },
      },
    }),
    count: db.expense.count({
      where: {
        user,
      },
    }),
  }
}

export const expenses = ({ input }) => {
  return db.expense.findMany({
    where: { user: input?.email },
    include: { expenseType: true, tags: true },
  })
}

export const expense = ({ id }) => {
  return db.expense.findUnique({
    where: { id },
    include: {
      tags: true,
      expenseType: {
        include: {
          tags: true,
        },
      },
    },
  })
}

export const createExpense = ({ input }) => {
  const {
    amount,
    user,
    expenseType: { id },
    tags,
  } = input

  //take ids from tags
  const tagIds = tags?.ids ? [...tags.ids] : []

  return db.expense.create({
    data: {
      amount,
      user,
      expenseType: {
        connect: {
          id,
        },
      },
      tags: {
        connect: [
          // connect/create accept id in forms of {id: xx}
          ...tagIds.map((id) => {
            return { id }
          }),
        ],
      },
    },
    include: {
      expenseType: true,
      tags: true,
    },
  })
}

export const connectTagsToExpense = async ({ input }) => {
  const {
    id,
    tags: { ids }, //! to be add
  } = input

  /* -- existing tag data
  [
    { id: 4, tagName: 'beer', expenseTypeId: 109 },
    { id: 5, tagName: 'burger', expenseTypeId: 109 },
    { id: 6, tagName: 'tvshow', expenseTypeId: 109 }
  ]
  */
  const { tags: existingTags } = await db.expense.findUnique({
    where: { id },
    include: { tags: true },
  })

  //! existing tag ids
  const existingTagIds = existingTags.map(({ id }) => {
    return id
  })

  // * not needed because "set" will do both connect/disconnect
  // const tagIdsToBeAdded = ids
  //   .filter((id) => !existingTagIds.includes(id))
  //   .map((id) => {
  //     return { id }
  //   })
  // const tagIdsToBeRemoved = existingTagIds
  //   .filter((id) => !ids.includes(id))
  //   .map((id) => {
  //     return { id }
  //   })

  return db.expense.update({
    where: { id },
    data: {
      tags: {
        // connect: tagIdsToBeAdded,
        // disconnect: tagIdsToBeRemoved,
        set: [
          ...ids.map((id) => {
            return { id }
          }),
        ],
      },
    },
    include: { tags: true },
  })
}

// add single tag to expense
export const addTag = ({ id, tag }) => {
  return db.expense.update({
    where: { id },
    data: {
      tags: {
        connect: { id: tag },
      },
    },
    include: { tags: true },
  })
}

export const deleteExpense = ({ id }) => {
  return db.expense.delete({
    where: { id },
  })
}

export const myExpenses = ({ input }) => {
  return db.expense.findMany({
    where: { user: input },
    include: {
      expenseType: {
        select: {
          id: true,
          description: true,
          newName: true,
          tags: true,
          user: true,
        },
      },
      tags: true,
    },
  })
}

export const updateExpense = async ({ input }) => {
  const { id, amount, createdAt, expenseType, tags } = input
  const { id: expenseTypeId } = expenseType
  const { ids } = tags
  return await db.expense.update({
    where: { id },
    data: {
      amount,
      createdAt,
      expenseType: {
        connect: { id: expenseTypeId },
      },
      tags: {
        set: [
          ...ids.map((id) => {
            return { id }
          }),
        ],
      },
    },
    include: {
      tags: true,
      expenseType: {
        include: {
          tags: true,
        },
      },
    },
  })
}

export const expenseCount = ({ user }) => {
  return db.expense.count({
    where: { user },
  })
}

export const userExpensesSum = async ({ input }) => {
  const { user } = input
  const result = await db.expense.aggregate({
    sum: {
      amount: true,
    },
    where: {
      user,
    },
  })
  const {
    sum: { amount },
  } = result
  return amount
}

export const expenseByType = async ({
  user,
  maxDate,
  minDate,
  chosenTagIds = [],
}) => {
  minDate = minDate ? minDate : '1900-01-01'
  maxDate = maxDate ? maxDate : '9999-01-01'

  /*
    args: user, maxDate, minDate
    sql:
    select sum(amount) from db.expense
    where createAt <= maxDate and createAt >= minDate
    groupby expenseTypeId
  */

  //--
  const result = await db.expense.groupBy({
    by: ['expenseTypeId'],
    where: {
      user,
      AND: [
        { createdAt: { gte: new Date(minDate) } },
        { createdAt: { lte: new Date(maxDate) } },
      ],
      OR: [
        {
          tags: {
            some: {
              id: { in: [...chosenTagIds] },
            },
          },
        },
        {
          tags: {
            none: {},
          },
        },
      ],
    },
    _sum: {
      amount: true,
    },
  })
  return result
  //--
}

//tag: provide selection for user to specify whether to include expense with no tags

export const expenseByCategory = async ({
  user,
  maxDate = '9999-01-01',
  minDate = '1900-01-01',
  chosenTagIds = [],
}) => {
  const byDateResult = await db.expense.groupBy({
    by: ['createdAt'],
    where: {
      user,
      AND: [
        { createdAt: { gte: new Date(minDate) } },
        { createdAt: { lte: new Date(maxDate) } },
      ],
      OR: [
        {
          tags: {
            some: {
              id: { in: [...chosenTagIds] },
            },
          },
        },
        {
          tags: {
            none: {},
          },
        },
      ],
    },
    _sum: {
      amount: true,
    },
  })

  const byTypeResult = await db.expense.groupBy({
    by: ['expenseTypeId'],
    where: {
      user,
      AND: [
        { createdAt: { gte: new Date(minDate) } },
        { createdAt: { lte: new Date(maxDate) } },
      ],
      OR: [
        {
          tags: {
            some: {
              id: { in: [...chosenTagIds] },
            },
          },
        },
        {
          tags: {
            none: {},
          },
        },
      ],
    },
    _sum: {
      amount: true,
    },
  })

  return [byDateResult, byTypeResult]
}

export const queryOneTypeAllExpenses = async ({ input }) => {
  const { user, maxDate, minDate, chosenTagIds, expenseType, page } = input
  const { id: expenseTypeId } = expenseType
  const offset = page ? (page - 1) * 5 : 0

  const settings = {
    where: {
      user,
      expenseType: {
        is: {
          id: expenseTypeId,
        },
      },
      AND: [
        { createdAt: { gte: new Date(minDate ? minDate : '1999-01-01') } },
        { createdAt: { lte: new Date(maxDate ? maxDate : '9999-01-01') } },
      ],
      OR: [
        {
          tags: {
            some: {
              id: {
                in: chosenTagIds ? [...chosenTagIds] : [25, 26, 27, 28, 29],
              },
            },
          },
        },
        { tags: { none: {} } },
      ],
    },
  }

  const paginatedSettings = {
    ...settings,
    take: 5,
    skip: offset,
    orderBy: { createdAt: 'desc' },
  }

  const result = await db.expense.findMany({
    ...paginatedSettings,
  })
  return {
    expenses: result,
    count: db.expense.count({
      ...settings,
    }),
  }
}
