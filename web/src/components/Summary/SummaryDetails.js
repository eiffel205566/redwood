import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Wrapper, calculateWidth } from '../Misc/UtilityFunc'
import { ClockLoading } from 'src/components/Misc/svg'
import { QUERY_USER_ONE_TYPE_ALL_EXPENSES } from 'src/components/Misc/Queries'

export const SummaryDetails = ({ typeCategoryState, user }) => {
  //* Constant
  const entryPerQuery = 1

  //* Expenses details state local storage
  const [expenseDetails, setExpenseDetails] = useState({
    expenses: null,
    page: 1,
    count: 0,
    maxExpense: 1,
  })

  //* update whenever query result change
  const { data, loading } = useQuery(QUERY_USER_ONE_TYPE_ALL_EXPENSES, {
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
      const newExpensesList = data?.queryOneTypeAllExpenses?.expenses
        ? data?.queryOneTypeAllExpenses?.expenses
        : []
      return {
        ...state,
        expenses: !state.expenses
          ? newExpensesList
          : [...state.expenses, ...newExpensesList],
        count: data?.queryOneTypeAllExpenses?.count,
      }
    })
  }, [data])

  //* onScroll handling
  let throttleTimeout = useRef(null)
  const onHandleScroll = (e) => {
    //callback to setState and increment page number
    const callback = () => {
      setTimeout(() => {
        //whether the scroll bar had reached the bottom
        let isScrolledBottom =
          e.target.scrollHeight - Math.abs(e.target.scrollTop) ===
          e.target.clientHeight
        console.log(isScrolledBottom)

        if (isScrolledBottom) {
          setExpenseDetails((state) => {
            return {
              ...state,
              page: ++state.page,
            }
          })
        }
      }, 500)
    }

    //throttled 500ms version of handling scroll
    if (!throttleTimeout.current && !loading) {
      //* when page (strarting at 1) X number of entry per page >= count, we reached the end
      if (expenseDetails.page * entryPerQuery < expenseDetails.count) {
        callback()
      }

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
      {loading && <ClockLoading className="h-8 w-8 cursor-not-allowed" />}
      {expenseDetails.page * entryPerQuery >= expenseDetails.count && (
        <EndOfLine />
      )}
    </section>
  )
}

export const SummaryDetailItem = ({ amount, date }) => {
  const dateLong = new Date(date.replace('-', '/'))
  const dateText = dateLong.toDateString().split(' ').slice(1, 3).join('-')

  return (
    <div className="h-8 w-full p-1 border flex justify-between my-1">
      <div
        className={`h-full ${
          Math.abs(amount) >= 1000
            ? 'w-60'
            : calculateWidth(Math.abs(amount), 1000)
        } rankBarContent text-gray-200 text-center`}
      >
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

const EndOfLine = () => {
  return (
    <div className="h-8 w-full p-1 flex justify-between my-1">
      <div className="h-full w-full text-gray-200 text-center">
        <div className="h-full flex flex-col justify-center text-sm sm:text-base">
          <span>--- End Of Data ---</span>
        </div>
      </div>
    </div>
  )
}
