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

  //! try to separate expense from income
  const separateData = (obj) => {
    let positive = {}
    let negative = {}

    for (let k in obj) {
      if (obj[k] > 0) {
        positive[k] = obj[k]
      } else {
        negative[k] = obj[k]
      }
    }

    // if (Object.keys(positive).length === 0) {
    //   positive = {}
    // }

    // if (Object.keys(negative).length === 0) {
    //   negative = {}
    // }
    return [positive, negative]
  }

  const formattedAndSeparatedData = formattedData
    ? separateData(formattedData)
    : null
  const formattedIncomeData = formattedAndSeparatedData
    ? formattedAndSeparatedData[0]
    : null
  const formattedExpenseData = formattedAndSeparatedData
    ? formattedAndSeparatedData[1]
    : null
  console.log(formattedIncomeData, formattedExpenseData)

  //* formatted data:
  // const data = {
  //   labels: formattedData
  //     ? Object.keys(formattedData)
  //     : ['Grocery', 'Business', 'Fee', 'Investment', 'Work'],
  //   datasets: [
  //     {
  //       data: formattedData
  //         ? Object.values(formattedData)
  //         : [33, 53, 85, 41, 44, 65],
  //       fill: true,
  //       backgroundColor: [
  //         ...generateRandomColors(
  //           formattedData ? Object.keys(formattedData).length : 6
  //         ),
  //       ],
  //       borderColor: '#C0C0C0',
  //     },
  //   ],
  // }

  //! TRY lable in array, [[label_1], [label_2]]
  let labels = formattedAndSeparatedData
    ? [
        [...Object.keys(formattedExpenseData)],
        [...Object.keys(formattedIncomeData)],
      ]
    : ['Grocery', 'Business', 'Fee', 'Investment', 'Work']

  const data = {
    // labels,
    datasets: [
      {
        data: formattedExpenseData
          ? Object.values(formattedExpenseData)
          : [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: [
          ...generateRandomColors(
            formattedExpenseData ? Object.keys(formattedExpenseData).length : 6
          ),
        ],
        borderColor: '#C0C0C0',
      },
      {
        data: formattedIncomeData
          ? Object.values(formattedIncomeData)
          : [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: [
          ...generateRandomColors(
            formattedIncomeData ? Object.keys(formattedIncomeData).length : 6
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
    //* tooltips possbly used for stacked bar chart
    // tooltips: {
    //   callbacks: {
    //     label: function (tooltipItem, data) {
    //       var dataset = data.datasets[tooltipItem.datasetIndex]
    //       var total = dataset.data.reduce(function (
    //         previousValue,
    //         currentValue
    //       ) {
    //         return previousValue + currentValue
    //       })
    //       var currentValue = dataset.data[tooltipItem.index]
    //       var percentage = Math.floor((currentValue / total) * 100 + 0.5)
    //       return percentage + '%'
    //     },
    //   },
    // },
  }

  return (
    <Fragment>
      <Doughnut data={data} options={options} />
    </Fragment>
  )
}

export default BreakdownChart
