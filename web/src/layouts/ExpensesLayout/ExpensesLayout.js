import { Link, routes } from '@redwoodjs/router'
import { Toaster } from '@redwoodjs/web/toast'

const ExpensesLayout = (props) => {
  return (
    <div className="rw-scaffold">
      <Toaster />
      <header className="rw-header">
        <h1 className="rw-heading rw-heading-primary">
          <Link to={routes.home()} className="rw-link mx-5">
            Home
          </Link>
          <Link to={routes.expenses()} className="rw-link mx-5">
            Expenses
          </Link>
        </h1>
        <Link to={routes.newExpense()} className="rw-button rw-button-green">
          <div className="rw-button-icon">+</div> New Expense
        </Link>
      </header>
      <main className="rw-main">{props.children}</main>
    </div>
  )
}

export default ExpensesLayout
