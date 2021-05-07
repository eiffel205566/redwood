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

? has to comeup with a way to:
* compare the ids passed in to connectTag mutation and
* existing tag ids:

- in input not in cache, then "ADD" it
- in input and in cache, connectTag mutation executes, but nothing change
- not in input but in cache, "disconnect"

*/
//! note connectTag connect 1 tag to multiple Expense
export const connectTag = ({ input }) => {
  const {
    id,
    expenses: { ids },
  } = input

  //read data first

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
