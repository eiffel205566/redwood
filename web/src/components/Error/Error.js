import React from 'react'
import { Form, Submit } from '@redwoodjs/forms'

const Error = ({
  setIconType,
  setTypePageErrorState,
  setTypePageFormDesc,
  typePageErrorState,
}) => {
  const { errorMessage } = typePageErrorState

  const onSubmit = () => {
    setIconType((state) => {
      return { ...state, currentType: '', id: null, currentName: '' }
    })
    setTypePageErrorState((state) => {
      return { ...state, errorState: false, errorMessage: null }
    })
    setTypePageFormDesc((state) => {
      return { ...state, typePageDescription: '' }
    })
  }

  return (
    <div className="background bg-gray-100 absolute min-h-full min-w-full z-20 bg-opacity-50">
      <Form
        onSubmit={onSubmit}
        className="flex flex-col justify-end p-2 border rounded-lg h-32 w-60 absolute background bg-gray-300 inset-1/2 transform -translate-x-1/2 -translate-y-full"
      >
        <div className="text-center flex-grow w-28 mt-2 min-w-full max-w-full text-sm sm:text-base">
          {errorMessage ? errorMessage : 'Action Failed'}
        </div>
        <Submit className="bg-gray-400 hover:bg-green-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base">
          OK
        </Submit>
      </Form>
    </div>
  )
}

export default Error
