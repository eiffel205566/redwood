import React from 'react'
import { Form, Submit } from '@redwoodjs/forms'
import { ALL_USER_ICONS, DELETE_TYPE } from '../Misc/Queries'
import { useMutation } from '@redwoodjs/web'
import { ClockLoading } from '../Misc/svg'

const Confirmation = ({
  currentName,
  setTypePageErrorState,
  setIconType,
  setTypePageFormDesc,
  setNeedConfirm,
  id,
  user,
  userTypes,
}) => {
  //delete user type
  const [deleteType, { loading }] = useMutation(DELETE_TYPE, {
    onCompleted: () => {
      setIconType((state) => {
        return { ...state, currentType: '', id: null, currentName: '' }
      })
    },
  })

  //delete handler
  const onDelete = async () => {
    try {
      await deleteType({
        variables: {
          input: {
            id,
          },
        },
        update: (cache, { data }) => {
          const {
            deleteExpenseType: { id },
          } = data
          cache.writeQuery({
            query: ALL_USER_ICONS,
            variables: { input: { user } },
            data: {
              userTypes: [...userTypes.filter((type) => type.id !== id)],
            },
          })
        },
      })
      setNeedConfirm((state) => {
        return { ...state, confirmNeeded: false }
      })
      setIconType((state) => {
        return { ...state, currentType: '', id: null, currentName: '' }
      })
      setTypePageErrorState((state) => {
        return { ...state, errorState: false, errorMessage: null }
      })
      setTypePageFormDesc((state) => {
        return { ...state, typePageDescription: '' }
      })
    } catch (error) {
      // console.log(error)
      document.body.classList.remove('overflow-hidden')
      setTypePageErrorState((state) => {
        return {
          ...state,
          errorState: true,
          errorMessage: error.message.includes('violate the required relation')
            ? 'Please Delete Expense/Income Entry on Expense Page first'
            : 'Error: Please Try Again', //'Please select an icon',
        }
      })
    }
  }

  //onClick: cancel
  const onClick = () => {
    setNeedConfirm((state) => {
      return { ...state, confirmNeeded: false }
    })
    setIconType((state) => {
      return { ...state, currentType: '', id: null, currentName: '' }
    })
    setTypePageErrorState((state) => {
      return { ...state, errorState: false, errorMessage: null }
    })
    setTypePageFormDesc((state) => {
      return { ...state, typePageDescription: '' }
    })
    document.body.classList.remove('overflow-hidden')
  }

  return (
    <div className="background bg-gray-100 fixed h-screen min-w-full z-30 bg-opacity-50">
      <Form
        onSubmit={onDelete}
        className="flex flex-col justify-end p-2 border rounded-lg h-40 w-60 absolute background bg-gray-300 inset-1/2 transform -translate-x-1/2 -translate-y-full"
      >
        {loading ? (
          <ClockLoading className="w-8 h-8 z-50 text-gray-500 mx-auto" />
        ) : (
          <div className="text-center flex-grow w-28 mt-2 min-w-full max-w-full text-sm sm:text-base">
            {`Delete ${currentName} ?`}
          </div>
        )}
        <Submit
          disabled={loading}
          className={`${
            loading ? 'cursor-not-allowed' : ''
          } bg-gray-400 hover:bg-green-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base`}
        >
          Confirm
        </Submit>
        <button
          onClick={onClick}
          type="button"
          className="bg-gray-400 hover:bg-red-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base"
        >
          Cancel
        </button>
      </Form>
    </div>
  )
}

export default Confirmation
