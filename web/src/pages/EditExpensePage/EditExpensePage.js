import ExpensesLayout from 'src/layouts/ExpensesLayout'
import EditExpenseCell from 'src/components/EditExpenseCell'

const EditExpensePage = ({ id }) => {
  return (
    <ExpensesLayout>
      <EditExpenseCell id={id} />
    </ExpensesLayout>
  )
}

export default EditExpensePage
