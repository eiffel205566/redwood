import { db } from 'src/lib/db'

export const expenseTypes = () => {
  return db.expenseType.findMany()
}

export const userTypes = ({ user }) => {
  return db.expenseType.findMany({
    where: {
      user,
    },
    orderBy: {
      id: 'asc',
    },
  })
}

export const createExpenseType = ({ input }) => {
  return db.expenseType.create({
    data: input,
  })
}

export const deleteExpenseType = ({ input: { id } }) => {
  return db.expenseType.delete({
    where: {
      id,
    },
  })
}

export const updateExpenseType = ({ input }) => {
  const { id, newName } = input
  return db.expenseType.update({
    where: {
      id,
    },
    data: {
      newName,
    },
  })
}
