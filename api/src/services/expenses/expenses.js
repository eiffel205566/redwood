import { db } from 'src/lib/db'

export const expenses = ({ input }) => {
  return db.expense.findMany({
    where: { user: input?.email },
    include: { expenseType: true, tags: true },
  })
}

export const expense = ({ id }) => {
  return db.expense.findUnique({
    where: { id },
    include: { tags: true, expenseType: true },
  })
}

export const createExpense = ({ input }) => {
  const {
    amount,
    user,
    expenseType: { id },
  } = input
  return db.expense.create({
    data: {
      amount,
      user,
      expenseType: {
        connect: {
          id,
        },
      },
    },
    include: {
      expenseType: true,
      tags: true,
    },
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

export const myExpenses = ({ input }) => {
  return db.expense.findMany({
    where: { user: input },
  })
}
