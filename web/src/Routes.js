import { Router, Route, Private } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home">
        <Route path="/expenses/new" page={NewExpensePage} name="newExpense" />
        <Route path="/expenses/{id:Int}/edit" page={EditExpensePage} name="editExpense" />
        <Route path="/expenses/{id:Int}" page={ExpensePage} name="expense" />
        <Route path="/expenses" page={ExpensesPage} name="expenses" />
      </Private>
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
