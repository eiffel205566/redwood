import { Link, routes } from '@redwoodjs/router'
import React from 'react'
import BlogLayout from '../../layouts/BlogLayout'
import { Customize, Spin } from 'src/components/Misc/svg'
import { GoPlusSmall } from 'react-icons/go'
import DefaultTypes from 'src/components/DefaultType/DefaultTypes'
import { useEffect, useState } from 'react'
import { iconTypes } from 'src/components/DefaultType/Static'
import { useForm } from 'react-hook-form'
import { useQuery, useMutation } from '@redwoodjs/web'
import TypesCell from 'src/components/DefaultType/TypesCell'
import SingleType from 'src/components/DefaultType/SingleType'
import UserTypes from 'src/components/DefaultType/UserTypes'

import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
} from '@redwoodjs/forms'

const ALL_USER_ICONS = gql`
  query EXPENSETYPES {
    expenseTypes {
      id
      description
      newName
      user
    }
  }
`
const CREATE_TYPE = gql`
  mutation CREATETYPE($input: CreateExpenseTypeInput!) {
    createExpenseType(input: $input) {
      id
      description
      newName
      user
    }
  }
`

const TypePage = () => {
  //hooks
  const [iconType, setIconType] = useState({
    currentType: '',
    id: null,
    currentName: '',
  })
  const { currentType, id, currentName } = iconType

  const formMethods = useForm({ mode: 'onBlur' })

  const [types, setTypes] = useState({
    userTypes: null,
  })
  const { userTypes } = types

  const { data, loading: allUserLoading } = useQuery(ALL_USER_ICONS)
  const { expenseTypes } = data || { expenseTypes: null }

  //--

  //lifecycle: onmount
  useEffect(() => {
    setTypes((state) => {
      return {
        ...state,
        userTypes: expenseTypes ? [...expenseTypes] : null,
      }
    })
  }, [data])
  //--

  //handlers
  const onSubmit = (data) => {
    if (currentType) {
      console.log({
        ...data,
        description: currentType,
        user: 'fakeuser2.insight@gmail.com',
      })
    }
  }
  const onClick = () => {
    setIconType((state) => {
      return { ...state, currentType: '', id: null, currentName: '' }
    })
    formMethods.reset()
    formMethods.clearErrors()
  }
  //--

  return (
    <BlogLayout>
      <div className="m-5 sm:m-10 md:m-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-200 overflow-scroll max-h-72 p-1 rounded-xl">
        {allUserLoading ? (
          <Spin className="'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 text-gray-500 animate-spin" />
        ) : (
          userTypes && (
            <UserTypes
              id={id}
              userTypes={userTypes}
              iconTypes={iconTypes}
              setIconType={setIconType}
            />
          )
        )}
      </div>

      <div className="m-5 sm:m-10 md:m-20 h-96 bg-gray-200 border border-transparent rounded-xl p-1 grid grid-cols-3 overflow-hidden">
        <div className="flex flex-col">
          {currentType ? (
            React.createElement(iconTypes[currentType], {
              className:
                'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto',
            })
          ) : (
            <Customize className="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto" />
          )}
          <Form
            onSubmit={onSubmit}
            validation={{ mode: 'onBlur' }}
            formMethods={formMethods}
            className="ml-5"
          >
            <FormError
              wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
            />
            <Label
              name="name"
              className="text-xs sm:text-sm md:text-base mb-1 sm:mb-5"
            >
              {!currentType
                ? 'Pick A Icon to Start'
                : !id
                ? 'Adding New Exp Type'
                : 'Rename Your Exp Type'}
            </Label>
            <TextField
              name="Name"
              validation={{ required: true }}
              errorClassName="error rounded p-1 min-w-full max-w-full"
              className="border border-gray-500 rounded p-1 min-w-full max-w-full text-xs sm:text-sm md:text-base"
              placeholder={currentName ? currentName : currentType}
            />
            {currentType ? (
              <FieldError
                name="Name"
                className="error text-xs sm:text-sm md:text-base"
              />
            ) : null}

            <div className="mt-5 flex flex-col">
              <Submit
                className="bg-gray-400 hover:bg-green-300 text-gray py-2 sm:px-4 rounded w-28 mt-5 min-w-full max-w-full text-xs sm:text-sm md:text-base"
                disabled={false}
              >
                Submit
              </Submit>

              <button
                onClick={onClick}
                className="bg-gray-400 hover:bg-red-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base"
              >
                Cancel
              </button>
              {currentName && (
                <button className="bg-gray-400 hover:bg-red-700 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base">
                  Delete
                </button>
              )}
            </div>
          </Form>
        </div>
        <DefaultTypes
          setIconType={setIconType}
          currentType={currentType}
          id={id}
        />
      </div>
    </BlogLayout>
  )
}

export default TypePage
