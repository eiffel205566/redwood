import { db } from 'src/lib/db'

export const tags = () => {
  return db.tag.findMany({
    include: {
      expenses: true,
      expenseType: true,
    },
  })
}

export const createTag = ({ input }) => {
  const {
    tagName,
    expenseType: { id },
  } = input
  return db.tag.create({
    data: {
      tagName,
      expenseType: {
        connect: {
          id,
        },
      },
    },
    include: {
      expenseType: true,
    },
  })
}

/*

* Note:

set: to connect to multiple expenses by returning [{id},{id},{id}]
disconnect: to disconnect to multiple expense

*/
export const connectTag = ({ input }) => {
  const {
    id,
    expenses: { ids },
  } = input
  return db.tag.update({
    where: { id },
    data: {
      expenses: {
        set: [
          ...ids.map((id) => {
            return { id }
          }),
        ],
        // disconnect: [
        //   ...ids.map((id) => {
        //     return { id }
        //   }),
        // ],
      },
    },
    include: {
      expenses: true,
    },
  })
}
