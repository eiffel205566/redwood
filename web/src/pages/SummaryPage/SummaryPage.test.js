import { render } from '@redwoodjs/testing'

import SummaryPage from './SummaryPage'

describe('SummaryPage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<SummaryPage />)
    }).not.toThrow()
  })
})
