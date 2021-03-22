import { db } from 'src/lib/db'

export const expenses = ({ input }) => {
  return db.expense.findMany({
    where: { user: input?.email },
  })
}

export const expense = ({ id }) => {
  return db.expense.findUnique({
    where: { id },
  })
}

export const createExpense = ({ input }) => {
  return db.expense.create({
    data: input,
  })
}

export const updateExpense = ({ id, input }) => {
  return db.expense.update({
    data: input,
    where: { id },
  })
}

export const deleteExpense = ({ id }) => {
  return db.expense.delete({
    where: { id },
  })
}
