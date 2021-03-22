import BlogLayout from '../../layouts/BlogLayout'
import { useAuth } from '@redwoodjs/auth'
import ExpensesCell from 'src/components/ExpensesCell'
import { useQuery } from '@redwoodjs/web'
import { useEffect, useState } from 'react'
const QUERY = gql`
  query EXPENSES {
    expenses {
      id
      amount
      type
      user
    }
  }
`

const HomePage = () => {
  const { data } = useQuery(QUERY)
  const [expenses, setExpenses] = useState({
    expenses: [],
  })

  useEffect(() => {
    setExpenses((currState) => {
      return { ...currState, expenses: data?.expenses }
    })
  }, [data])

  // console.log(expenses?.expenses)

  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()

  const { email } = currentUser || { email: 'fakeuser.expinsight@gmail.com' }

  const logInRevised = () => {
    logIn()
    localStorage.setItem('user', currentUser?.email)
  }

  const logOutRevised = () => {
    logOut()
    localStorage.removeItem('user')
  }
  return (
    <>
      <BlogLayout
        logInRevised={logInRevised}
        logOutRevised={logOutRevised}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        className="z-10"
      ></BlogLayout>
      {isAuthenticated || currentUser?.email || (
        <div id="container relative">
          <video autoPlay="true" loop playsInline muted id="video">
            <source
              src="https://www.expenseinsight.ca/resource/background.mp4"
              type="video/mp4"
            />
          </video>
          <button
            onClick={logIn}
            className="text-4xl absolute z-10 text-white hover:text-gray-500 transition duration-100 inset-1/2"
            id="btn"
          >
            Log In Here...
          </button>
        </div>
      )}
    </>
  )
}
export default HomePage
