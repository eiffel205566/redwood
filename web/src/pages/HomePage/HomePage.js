import BlogLayout from '../../layouts/BlogLayout'
import { Bar } from 'react-chartjs-2'
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
  const { data } = useQuery(QUERY)
  const [expenses, setExpenses] = useState({
    expenses: [],
  })

  useEffect(() => {
    setExpenses((currState) => {
      return { ...currState, expenses: data?.expenses }
    })
  }, [data])

  //grab labels
  let labels = []
  let chartData
  let graphData
  if (expenses?.expenses) {
    let expensesList = expenses?.expenses.filter(
      (expense) => expense.user === email
    )
    expensesList.forEach((expense) => {
      if (!labels.includes(expense.type)) {
        labels.push(expense.type)
      }
    })
    chartData = labels.reduce((prev, curr) => {
      return { ...prev, [curr]: 0 }
    }, {})
    expensesList.forEach((expense) => {
      chartData[expense.type] += +expense?.amount || 0
    })
    console.log(chartData)
    graphData = {
      labels,
      datasets: [
        {
          label: 'Sample Chart',
          data: Object.values(chartData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    }
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
      {isAuthenticated && currentUser?.email && expenses?.expenses && (
        <Bar
          className="mx-10"
          data={graphData}
          width={300}
          height={300}
          options={{ maintainAspectRatio: false }}
        />
      )}
    </>
  )
}
export default HomePage
