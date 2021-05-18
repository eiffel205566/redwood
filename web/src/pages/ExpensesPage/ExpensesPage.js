import ExpensesLayout from 'src/layouts/ExpensesLayout'
import ExpensesCell from 'src/components/ExpensesCell'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { useEffect, useState, Fragment } from 'react'
import { toast, Toaster } from '@redwoodjs/web/toast'
import NewExpense from 'src/components/Expenses/NewExpense'
import { USER_TYPES_QUERY } from './UserTypesTagsQuery'
import { useQuery } from '@redwoodjs/web'
import { iconTypes } from 'src/components/DefaultType/Static'

const ExpensesPage = () => {
  //side bar state
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  //--

  // fake user
  const currentUser = {
    app_metadata: {
      provider: 'email',
    },
    email: 'fakeuser2.expinsight@gmail.com',
    exp: 1616348450,
    sub: '3cff8205-96d0-464a-a6c2-31043649f687',
    user_metadata: {
      full_name: 'Fake User',
    },
    roles: [],
  }
  const isAuthenticated = true
  const { email: user } = currentUser
  //--

  //state to handle tag edit state
  const [tagEditState, setTagEditState] = useState({
    id: null,
    editState: false,
    newTagState: false,
  })

  //have to save expenseType and tags in state in Page
  const [newExpenseState, setNewExpenseState] = useState({
    id: null, //expenseType id when overlayed NewExpense comp showed up
    expenseToEdit: null, //not used when adding new, used when editing existing exp
    types: null,
    tags: null,
    chosenTags: [],
    newTagName: null,
    isAddingTag: false,
    isDeletingTag: false,
    amount: null,
    date: null,
  })

  //USER_TYPES_QUERY
  //Make User Types Query onMount and store in staet
  const { data } = useQuery(USER_TYPES_QUERY, {
    variables: { input: { user } },
  })
  const { userTypes } = data || {}

  useEffect(() => {
    setNewExpenseState((state) => {
      return {
        ...state,
        types: data ? [...userTypes] : null,
      }
    })
  }, [data, userTypes])

  return (
    <Fragment>
      {tagEditState.newTagState ? (
        <NewExpense
          user={user}
          setTagEditState={setTagEditState}
          userTypes={userTypes}
          iconTypes={iconTypes}
          setNewExpenseState={setNewExpenseState}
          newExpenseState={newExpenseState}
        />
      ) : null}
      <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        <Toaster timeout={2000} />
        <ExpensesCell
          input={user}
          tagEditState={tagEditState}
          setTagEditState={setTagEditState}
          user={user}
          setNewExpenseState={setNewExpenseState}
        />
      </CommonLayout>
    </Fragment>
  )
}

export default ExpensesPage
