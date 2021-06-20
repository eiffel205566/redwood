import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Wrapper } from '../Misc/UtilityFunc'
import { QUERY_USER_ONE_TYPE_ALL_EXPENSES } from 'src/components/Misc/Queries'

export const SummaryDetails = ({ typeCategoryState, user }) => {
  //* Expenses details state local storage
  const [expenseDetails, setExpenseDetails] = useState({
    expenses: null,
    page: 1,
    count: 0,
  })

  //* update whenever query result change
  const { data } = useQuery(QUERY_USER_ONE_TYPE_ALL_EXPENSES, {
    variables: {
      input: {
        user,
        page: expenseDetails.page,
        expenseType: { id: typeCategoryState.typeToEdit.expenseTypeId },
        chosenTagIds: typeCategoryState.chosenTags
          ? [...typeCategoryState.chosenTags.map((tag) => tag.id)]
          : null,
      },
    },
  })

  useEffect(() => {
    setExpenseDetails((state) => {
      return {
        ...state,
        expenses: data?.queryOneTypeAllExpenses?.expenses,
        count: data?.queryOneTypeAllExpenses?.count,
      }
    })
  }, [data])

  //* onScroll handling
  let throttleTimeout = useRef(null)
  const onHandleScroll = (e) => {
    const callback = () => {
      setTimeout(
        () =>
          console.log(
            e.target.scrollHeight - Math.abs(e.target.scrollTop) ===
              e.target.clientHeight
          ),
        500
      )
    }
    if (!throttleTimeout.current) {
      callback()
      throttleTimeout.current = setTimeout(() => {
        throttleTimeout.current = null
      }, 500)
    }
  }

  return (
    <section
      onScroll={onHandleScroll}
      className="h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-400 overflow-y-scroll pr-3"
    >
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      <ManyMany />
      {expenseDetails.expenses &&
        expenseDetails.expenses.map((expense, index) => (
          <SummaryDetailItem
            key={index}
            amount={expense?.amount}
            date={expense?.createdAt}
          />
        ))}
    </section>
  )
}

export const SummaryDetailItem = ({ amount, date }) => {
  const dateLong = new Date(date.replace('-', '/'))
  const dateText = dateLong.toDateString().split(' ').slice(1, 3).join('-')

  return (
    <div className="h-8 w-full p-1 border flex justify-between my-1">
      <div className="h-full w-60 rankBarContent text-gray-200 text-center">
        <div className="h-full flex flex-col justify-center text-sm sm:text-base">
          <span>{`$${amount}`}</span>
        </div>
      </div>
      <Wrapper className="cursor-default">
        <h3 className="text-white text-xs sm:text-sm whitespace-nowrap">
          {dateText}
        </h3>
      </Wrapper>
    </div>
  )
}

const ManyMany = () => {
  return (
    <div className="h-8 w-full p-1 border flex justify-between my-1">
      <div className="h-full w-60 rankBarContent text-gray-200 text-center">
        <div className="h-full flex flex-col justify-center text-sm sm:text-base">
          <span>xxxxx</span>
        </div>
      </div>
      <Wrapper className="cursor-default">
        <h3 className="text-white text-xs sm:text-sm whitespace-nowrap">
          Jun-03
        </h3>
      </Wrapper>
    </div>
  )
}
