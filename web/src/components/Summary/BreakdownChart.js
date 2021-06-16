import React, { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'

const BreakdownChart = ({ expenseByType, typeCategoryState }) => {
  const { types } = typeCategoryState || {}

  //map types prop of typeCategoryState to be: obj in form: {id: newName}
  const typeToNameMap = types
    ? types.reduce((prev, cur) => {
        return { ...prev, [cur.id]: cur.newName }
      }, {})
    : null

  //format expenseByType to be {id: amount}
  const formatData = (typeData, chartData) => {
    //typeData: {3: "newName"}
    return chartData.reduce((prev, cur) => {
      const typeId = cur.expenseTypeId
      const typeName = typeData[typeId]
      return { ...prev, [typeName]: Number(cur._sum.amount.toFixed(2)) }
    }, {})
  }

  //formattedData in form of {newName: amount}
  const formattedData = typeToNameMap
    ? formatData(typeToNameMap, expenseByType)
    : null
  // console.log(formattedData)

  //* formatted data:
  const data = {
    labels: formattedData
      ? Object.keys(formattedData)
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: formattedData
          ? Object.values(formattedData)
          : [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: [
          'rgba(255, 255, 0, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(255, 159, 64, 0.7)',
        ],
        borderColor: '#C0C0C0',
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: '#909090',
      },
    },
  }

  return (
    <Fragment>
      <Doughnut data={data} options={options} />
    </Fragment>
  )
}

export default BreakdownChart
