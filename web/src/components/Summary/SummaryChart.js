import React from 'react'

import { Fragment } from 'react'
import { Line } from 'react-chartjs-2'

const SummaryChart = ({ expenseByDate }) => {
  // -- expense by date prepared for displaying a chart
  const expenseByDateForChart = expenseByDate?.map((summary) => {
    return {
      createdAt: summary.createdAt.split('T')[0],
      flow: summary._sum.amount,
    }
  })

  //--
  const formattedData = expenseByDate
    ? expenseByDate.reduce((prev, cur, index, arr) => {
        let key = arr[index].createdAt.split('T')[0].slice(5)
        if (index === 0) {
          return { ...prev, [key]: Number(cur._sum.amount.toFixed(2)) }
        } else {
          let lastKey = arr[index - 1].createdAt.split('T')[0].slice(5)
          let value = prev[lastKey] + cur._sum.amount
          let formattedValue = Number(value.toFixed(2))
          return { ...prev, [key]: formattedValue }
        }
      }, {})
    : null

  const data = {
    labels: formattedData
      ? Object.keys(formattedData)
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        // label: 'First dataset',
        data: formattedData
          ? Object.values(formattedData)
          : [33, 53, 85, 41, 44, 65],
        fill: true,
        // backgroundColor: ['rgba(54, 162, 235, 0.2)'],
        borderColor: '#10B981',
      },
      // {
      //   label: 'Second dataset',
      //   data: [-33, 0, 35, 51, 54, 76],
      //   fill: false,
      //   borderColor: '#742774',
      // },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    scales: {
      yAxes: [
        {
          stacked: true,
          gridLines: {
            display: true,
            color: 'rgba(54, 162, 235,0.2)',
          },
          ticks: {
            fontColor: 'white',
            fontSize: 10,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            fontColor: 'white',
            fontSize: 10,
          },
        },
      ],
    },
    legend: {
      display: false,
      labels: {
        color: 'white',
        weight: '500',
      },
    },
    title: {
      display: true,
      text: 'Cash Balance By Date',
      fontColor: 'white',
    },
  }
  return (
    <Fragment>
      <Line data={data} options={options} />
    </Fragment>
  )
}

export default SummaryChart
