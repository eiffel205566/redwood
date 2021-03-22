import Expense from 'src/components/Expense'

export const QUERY = gql`
  query FIND_EXPENSE_BY_ID($id: Int!) {
    expense: expense(id: $id) {
      id
      amount
      type
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Expense not found</div>

export const Success = ({ expense }) => {
  return <Expense expense={expense} />
}
