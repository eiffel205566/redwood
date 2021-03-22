import { db } from 'src/lib/db'
import { UserInputError } from '@redwoodjs/api'

export const expenses = ({ input }) => {
  return db.expense.findMany({
    where: {
      user: input?.user,
    },
  })
}

export const createExpense = ({ input }) => {
  return db.expense.create({
    data: input,
  })
}

export const deleteExpense = (id) => {
  return db.expense.delete({
    where: id,
  })
}
