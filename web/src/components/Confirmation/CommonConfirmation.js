import React from 'react'
import { Form, Submit } from '@redwoodjs/forms'

const Confirmation = ({ message, onClick, onDelete, ...rest }) => {
  const {
    needConfirmation,
    setNeedConfirmation,
    onHandelDeleteOneExpense,
    newExpenseState,
  } = rest || {}

  return (
    <div className="select-none background bg-gray-100 absolute min-h-full min-w-full z-30 bg-opacity-50 text-white">
      <Form
        onSubmit={() => {
          setNeedConfirmation((state) => {
            return {
              ...state,
              needToConfirm: false,
            }
          })
          onHandelDeleteOneExpense(newExpenseState.expenseToEdit.id)
        }}
        className="flex flex-col justify-end p-2 border border-transparent rounded-lg h-40 w-60 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-full"
      >
        <div className="text-center flex-grow w-28 mt-2 min-w-full max-w-full text-sm sm:text-base">
          {`${message}?`}
        </div>
        <Submit className="hover:text-black bg-gray-400 hover:bg-green-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base">
          Confirm
        </Submit>
        <button
          type="button"
          onClick={
            setNeedConfirmation
              ? () => {
                  setNeedConfirmation((state) => {
                    return {
                      ...state,
                      needToConfirm: false,
                    }
                  })
                }
              : () => {}
          }
          className="hover:text-black bg-gray-400 hover:bg-red-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base"
        >
          Cancel
        </button>
      </Form>
    </div>
  )
}

export default Confirmation
