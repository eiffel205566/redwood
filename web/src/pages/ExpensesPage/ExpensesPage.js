import ExpensesLayout from 'src/layouts/ExpensesLayout'
import ExpensesCell from 'src/components/ExpensesCell'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { useEffect, useState } from 'react'

const ExpensesPage = () => {
  //side bar state
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  //--

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

  const [tagEditState, setTagEditState] = useState({
    id: null,
    editState: false,
  })

  return (
    <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
      <ExpensesCell
        input={user}
        tagEditState={tagEditState}
        setTagEditState={setTagEditState}
      />
    </CommonLayout>
  )
}

export default ExpensesPage
