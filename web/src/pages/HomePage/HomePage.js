import BlogLayout from '../../layouts/BlogLayout'
import { Bar, Doughnut } from 'react-chartjs-2'
import { useAuth } from '@redwoodjs/auth'
import { Summary } from 'src/components/Misc/Summary'
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
  // const { logIn, logOut } = useAuth()
  // const currentUser = {
  //   app_metadata: {
  //     provider: 'email',
  //   },
  //   email: 'fakeuser2.expinsight@gmail.com',
  //   exp: 1616348450,
  //   sub: '3cff8205-96d0-464a-a6c2-31043649f687',
  //   user_metadata: {
  //     full_name: 'Fake User',
  //   },
  //   roles: [],
  // }
  // const isAuthenticated = true

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

  const [chartType, setChartType] = useState({
    type: 'bar',
  })

  const onSetChartType = () => {
    if (chartType.type === 'bar') {
      setChartType((currState) => {
        return {
          ...currState,
          type: 'donut',
        }
      })
    } else {
      setChartType((currState) => {
        return {
          ...currState,
          type: 'bar',
        }
      })
    }
  }

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
    // console.log(expenses)
    graphData = {
      labels,
      datasets: [
        {
          label: 'Your Spending',
          data: Object.values(chartData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [],
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
            className="inline-block text-center text-4xl absolute top-1/2 left-1/2 z-10 text-white hover:text-gray-500 transition duration-100 p-5 border border-gray-500 rounded"
            id="btn"
          >
            Log In Here...
          </button>
        </div>
      )}
      {isAuthenticated && currentUser?.email && expenses?.expenses && (
        <div className="m-20">
          <button
            onClick={onSetChartType}
            className="inline m-auto bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
          >
            {chartType.type === 'bar' ? 'Donut Chart' : 'Bar Chart'}
          </button>
          {chartType.type === 'bar' ? (
            <Bar
              data={graphData}
              width={250}
              height={250}
              options={{
                maintainAspectRatio: false,
                scales: { yAxes: [{ ticks: { beginAtZero: true } }] },
              }}
            />
          ) : (
            <Doughnut
              data={graphData}
              width={250}
              height={250}
              options={{
                maintainAspectRatio: false,
              }}
            />
          )}
        </div>
      )}
      {isAuthenticated &&
        currentUser?.email &&
        expenses?.expenses &&
        (chartData?.length ? (
          <Summary expenses={Object.entries(chartData)} />
        ) : (
          <Summary labels={labels} chartData={chartData} />
        ))}
    </>
  )
}
export default HomePage
