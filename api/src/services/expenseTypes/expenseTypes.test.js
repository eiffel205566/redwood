import { expenseTypes } from './expenseTypes'

describe('expenseTypes', () => {
  scenario('returns all expenseTypes', async (scenario) => {
    const result = await expenseTypes()

    expect(result.length).toEqual(Object.keys(scenario.expenseType).length)
  })
})
