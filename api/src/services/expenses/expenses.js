import { db } from 'src/lib/db'
const EXPENSENS_PER_PAGE = 5

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
