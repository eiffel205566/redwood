import {
  expenses,
  expense,
  createExpense,
  updateExpense,
  deleteExpense,
} from './expenses'

describe('expenses', () => {
  scenario('returns all expenses', async (scenario) => {
    const result = await expenses()

    expect(result.length).toEqual(Object.keys(scenario.expense).length)
  })

  scenario('returns a single expense', async (scenario) => {
    const result = await expense({ id: scenario.expense.one.id })

    expect(result).toEqual(scenario.expense.one)
  })

  scenario('creates a expense', async (scenario) => {
    const result = await createExpense({
      input: { amount: 'String', type: 'String', user: 'String' },
    })

    expect(result.amount).toEqual('String')
    expect(result.type).toEqual('String')
    expect(result.user).toEqual('String')
  })

  scenario('updates a expense', async (scenario) => {
    const original = await expense({ id: scenario.expense.one.id })
    const result = await updateExpense({
      id: original.id,
      input: { amount: 'String2' },
    })

    expect(result.amount).toEqual('String2')
  })

  scenario('deletes a expense', async (scenario) => {
    const original = await deleteExpense({ id: scenario.expense.one.id })
    const result = await expense({ id: original.id })

    expect(result).toEqual(null)
  })
})
