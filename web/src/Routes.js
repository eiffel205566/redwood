import { Router, Route, Private } from '@redwoodjs/router'
import TestPage from './pages/TestPage/TestPage'

const Routes = () => {
  return (
    <Router>
      <Private unauthenticated="home">
        <Route path="/type" page={TypePage} name="type" />
        <Route path="/summary" page={SummaryPage} name="summary" />
        <Route path="/expenses" page={ExpensesPage} name="expenses" />
        {/*
          <Route path="/expenses/new" page={NewExpensePage} name="newExpense" />
          <Route path="/expenses/{id:Int}/edit" page={EditExpensePage} name="editExpense" />
         */}
      </Private>

      <Route path="/expenses/{id:Int}" page={ExpensesPage} name="Expenses" />
      <Route path="/test" page={TestPage} name="test" />
      <Route path="/about" page={AboutPage} name="about" />
      <Route path="/contacts" page={ContactPage} name="contact" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
