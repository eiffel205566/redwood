import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import { QUERY } from 'src/components/ExpensesCell'
import SingleExpense from './SingleExpense'
import { iconTypes } from 'src/components/DefaultType/Static'
import { Plus } from '../Misc/svg'

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

const ExpensesList = ({ myExpenses, tagEditState, setTagEditState, user }) => {
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
    <div className="w-full mt-5 flex flex-col justify-center select-none">
      <h1 className="text-white text-xl">{timeTag(new Date())}</h1>
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
          />
        )
      })}
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
        }}
        className="mx-auto h-6 w-6 text-white hover:text-green-300 cursor-pointer"
      />
    </div>
  )
}

export default ExpensesList
