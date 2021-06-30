import React, { Fragment } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { generateRandomColors } from 'src/components/Misc/UtilityFunc'

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
      : ['Grocery', 'Business', 'Fee', 'Investment', 'Work'],
    datasets: [
      {
        data: formattedData
          ? Object.values(formattedData)
          : [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: [
          ...generateRandomColors(
            formattedData ? Object.keys(formattedData).length : 6
          ),
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
