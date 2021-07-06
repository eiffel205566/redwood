import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/ExpensesCell'
import SingleExpense from './SingleExpense'
import { iconTypes } from 'src/components/DefaultType/Static'
import { ClockLoading, Plus } from '../Misc/svg'
import PagenatiedExpenses from './PagenatiedExpenses'
import { TiArrowRightOutline } from 'react-icons/ti'

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

const jsonTruncate = (obj) => {
  return truncate(JSON.stringify(obj, null, 2))
}

export const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toDateString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
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

  return (
    <div className="expensePageContainer w-full flex flex-col h-full justify-between select-none pb-5">
      <div className="h-full flex flex-col mx-2 sm:mx-0">
        <h1
          className={`${
            count ? 'text-white' : 'text-green-300'
          } text-base sm:text-xl`}
        >
          {count ? timeTag(new Date()) : 'Add New Entry To Start Tracking!!'}
        </h1>
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
        {/*

        */}
        <PagenatiedExpenses count={count} />
      </div>
    </div>
  )
}

export default ExpensesList
