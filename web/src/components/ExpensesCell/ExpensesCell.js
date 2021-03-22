import { Link, routes } from '@redwoodjs/router'

import Expenses from 'src/components/Expenses'

export const QUERY = gql`
  query EXPENSES {
    expenses {
      id
      amount
      type
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No expenses yet. '}
      <Link to={routes.newExpense()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ expenses }) => {
  return <Expenses expenses={expenses} />
}
