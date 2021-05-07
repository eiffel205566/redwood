import { Link, routes } from '@redwoodjs/router'

import Expenses from 'src/components/Expenses'

export const QUERY = gql`
  query EXPENSES($input: String!) {
    myExpenses(input: $input) {
      id
      amount
      createdAt
      expenseType {
        id
        user
        description
        newName
        tags {
          id
          tagName
        }
      }
      tags {
        id
      }
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

export const beforeQuery = (props) => {
  return {
    variables: props,
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  }
}

export const Success = ({ myExpenses, tagEditState, setTagEditState }) => {
  return (
    <Expenses
      myExpenses={myExpenses}
      tagEditState={tagEditState}
      setTagEditState={setTagEditState}
    />
  )
}
