import { render } from '@redwoodjs/testing'

import TypePage from './TypePage'

describe('TypePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TypePage />)
    }).not.toThrow()
  })
})
