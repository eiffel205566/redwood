import { Router, Route, Private } from '@redwoodjs/router'
import TestPage from './pages/TestPage/TestPage'

const Routes = () => {
  return (
    <Router>
      <Route path="/type" page={TypePage} name="type" />
      <Private unauthenticated="home">
        {/*
          <Route path="/expenses/new" page={NewExpensePage} name="newExpense" />
         */}
        <Route path="/expenses/{id:Int}/edit" page={EditExpensePage} name="editExpense" />
      </Private>

      <Route path="/expenses/{id:Int}" page={ExpensesPage} name="Expenses" />
      <Route path="/expenses" page={ExpensesPage} name="expenses" />
      <Route path="/test" page={TestPage} name="test" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contacts" page={ContactPage} name="contact" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
