import { Link, routes } from '@redwoodjs/router'
import { timeTag } from 'src/components/Expenses/Expenses'
import { ClockLoading } from 'src/components/Misc/svg'

import Expenses from 'src/components/Expenses'

// export const QUERY = gql`
//   query EXPENSES($input: String!) {
//     myExpenses(input: $input) {
//       id
//       amount
//       createdAt
//       expenseType {
//         id
//         user
//         description
//         newName
//         tags {
//           id
//           tagName
//         }
//       }
//       tags {
//         id
//       }
//     }
//   }
// `
export const QUERY = gql`
  query PAGINATED_EXPENSES($page: Int, $user: String!) {
    expensePage(page: $page, user: $user) {
      myExpenses {
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
      count
    }
  }
`

export const Loading = ({ user }) => (
  <div className="w-full mt-5 flex flex-col justify-center select-none">
    <h1 className="text-white text-xl">
      {timeTag(new Date())}
      <ClockLoading className="h-8 w-8 cursor-not-allowed animate-spin inline p-1" />
    </h1>
  </div>
)

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

export const beforeQuery = ({ user, page }) => {
  page = page ? parseInt(page, 10) : 1
  return {
    variables: { user, page },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const Success = ({
  // myExpenses,
  expensePage,
  tagEditState,
  setTagEditState,
  user,
  setNewExpenseState,
  page,
}) => {
  return (
    <Expenses
      myExpenses={expensePage.myExpenses}
      tagEditState={tagEditState}
      setTagEditState={setTagEditState}
      user={user}
      setNewExpenseState={setNewExpenseState}
      count={expensePage.count}
      page={page}
    />
  )
}
