import { expenses } from './expenses'

describe('expenses', () => {
  scenario('returns all expenses', async (scenario) => {
    const result = await expenses()

    expect(result.length).toEqual(Object.keys(scenario.expense).length)
  })
})
