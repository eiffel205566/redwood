import ExpensesLayout from 'src/layouts/ExpensesLayout'
import ExpenseCell from 'src/components/ExpenseCell'

const ExpensePage = ({ id }) => {
  return (
    <ExpensesLayout>
      <ExpenseCell id={id} />
    </ExpensesLayout>
  )
}

export default ExpensePage
