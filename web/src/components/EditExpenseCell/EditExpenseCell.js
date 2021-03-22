import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import ExpenseForm from 'src/components/ExpenseForm'

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
const UPDATE_EXPENSE_MUTATION = gql`
  mutation UpdateExpenseMutation($id: Int!, $input: UpdateExpenseInput!) {
    updateExpense(id: $id, input: $input) {
      id
      amount
      type
      user
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ expense }) => {
  const [updateExpense, { loading, error }] = useMutation(
    UPDATE_EXPENSE_MUTATION,
    {
      onCompleted: () => {
        toast.success('Expense updated')
        navigate(routes.expenses())
      },
    }
  )

  const onSave = (input, id) => {
    updateExpense({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Expense {expense.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <ExpenseForm
          expense={expense}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
