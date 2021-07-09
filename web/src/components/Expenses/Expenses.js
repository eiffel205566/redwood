import { useMutation } from '@redwoodjs/web'
import { useState } from 'react'
import { toast } from '@redwoodjs/web/toast'
// import { Link, routes } from '@redwoodjs/router'
// import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/ExpensesCell'
import SingleExpense from './SingleExpense'
import { iconTypes } from 'src/components/DefaultType/Static'
import { ClockLoading, Plus } from '../Misc/svg'
import PagenatiedExpenses from './PagenatiedExpenses'
import { TiArrowRightOutline } from 'react-icons/ti'
import { AiOutlineSearch } from 'react-icons/ai'
import { Spin, Check } from 'src/components/Misc/svg'

const DELETE_EXPENSE_MUTATION = gql`
  mutation DeleteExpenseMutation($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`

const MAX_STRING_LENGTH = 150

const truncate = (text) => {
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

export const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime} className="text-sm sm:text-base">
      {new Date(datetime).toDateString()}
    </time>
  )
}

const ExpensesList = ({
  myExpenses,
  tagEditState,
  setTagEditState,
  user,
  setNewExpenseState,
  count,
  page,
  setGrandMasterLoadingState,
  keywordState,
  setKeywordState,
}) => {
  //page state

  const [deleteExpense] = useMutation(DELETE_EXPENSE_MUTATION, {
    onCompleted: () => {
      toast.success('Expense deleted')
    },
    refetchQueries: [{ query: QUERY }],
    awaitRefetchQueries: true,
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete expense ' + id + '?')) {
      deleteExpense({ variables: { id } })
    }
  }

  //* local spinControl state
  const [spinState, setSpinState] = useState(false)
  //* --

  //* handle onChange of search bar
  const onChange = (e) => {
    setKeywordState((state) => {
      return {
        ...state,
        keywordTwo: e.target.value,
      }
    })
  }
  //* --

  return (
    <div className="expensePageContainer w-full flex flex-col h-full justify-between select-none pb-5">
      <div className="h-full flex flex-col mx-2 sm:mx-0">
        <div className="tagLineAndSearchBar h-8 flex justify-between mt-1">
          {/*

            <div className="h-full flex flex-col justify-center">
              <h1
                className={`${
                  count ? 'text-white' : 'text-green-300'
                } text-base sm:text-xl`}
              >
                {count
                  ? timeTag(new Date())
                  : keywordState.keyword
                  ? 'No Result Found'
                  : 'Add A New Entry!!'}
              </h1>
            </div>
          */}

          <div className="inputAndIcon h-full relative flex">
            <AiOutlineSearch className="absolute h-full w-6 top-0 right-16 z-2 text-green-300" />
            <input
              placeholder={
                keywordState.keywordTwo ? keywordState.keywordTwo : 'Search...'
              }
              type="text"
              className="h-full p-1 w-36 sm:w-48 bg-sideDark text-white relative focus:ring-1 focus:ring-green-300 z-1"
              value={keywordState.keywordTwo ? keywordState.keywordTwo : ''}
              onChange={onChange}
            />
            <div className="wrapper w-12 h-full flex ml-1">
              <Spin
                onMouseEnter={() => {
                  setSpinState(true)
                }}
                onMouseLeave={() => {
                  setSpinState(false)
                }}
                onClick={() => {
                  setKeywordState((state) => {
                    return {
                      ...state,
                      keyword: null,
                      keywordTwo: null,
                    }
                  })
                }}
                className={`cursor-pointer w-6 h-full text-white hover:text-green-300 ${
                  spinState ? 'animate-spin' : ''
                }`}
              />
              {keywordState.keywordTwo && (
                <Check
                  onClick={() => {
                    setKeywordState((state) => {
                      return {
                        ...state,
                        keyword: state.keywordTwo,
                      }
                    })
                  }}
                  className="w-6 h-full hover:text-green-300 text-white cursor-pointer"
                />
              )}
            </div>
          </div>
          <div className="h-full flex flex-col justify-center">
            <h1
              className={`${
                count ? 'text-white' : 'text-green-300'
              } text-base sm:text-xl`}
            >
              {count
                ? timeTag(new Date())
                : keywordState.keyword
                ? 'No Result Found'
                : 'Add A New Entry!!'}
            </h1>
          </div>

          {/*

            </input>
          */}
        </div>
        {myExpenses.map((singleExpense) => {
          return (
            <SingleExpense
              key={singleExpense.id}
              singleExpense={singleExpense}
              iconTypes={iconTypes}
              tagEditState={tagEditState}
              setTagEditState={setTagEditState}
              myExpenses={myExpenses}
              user={user}
              setNewExpenseState={setNewExpenseState}
              setGrandMasterLoadingState={setGrandMasterLoadingState}
            />
          )
        })}
      </div>
      <div className="relative flex flex-row">
        <div className="mx-auto flex flex-row">
          {!count && (
            <TiArrowRightOutline className="h-6 w-6 animatedArrow left-1/3 text-green-500" />
          )}
          <Plus
            onClick={() => {
              setTagEditState((state) => {
                return {
                  ...state,
                  id: null,
                  editState: false,
                  newTagState: true,
                }
              })
              document.body.classList.add('overflow-hidden')
            }}
            className="h-6 w-6 text-white hover:text-green-300 cursor-pointer"
          ></Plus>
          <p className="text-white hidden sm:block">Add New Entry</p>
        </div>
        <PagenatiedExpenses count={count} />
      </div>
    </div>
  )
}

export default ExpensesList
