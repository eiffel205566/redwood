import { Link, routes } from '@redwoodjs/router'
import React from 'react'
import BlogLayout from '../../layouts/BlogLayout'
import { Customize } from 'src/components/Misc/svg'
import { GoPlusSmall } from 'react-icons/go'
import DefaultTypes from 'src/components/DefaultType/DefaultTypes'
import { useEffect, useState } from 'react'
import { iconTypes } from 'src/components/DefaultType/Static'
import { useForm } from 'react-hook-form'
import TypesCell from 'src/components/DefaultType/TypesCell'

import {
  Form,
  TextField,
  TextAreaField,
  Submit,
  FieldError,
  Label,
  FormError,
} from '@redwoodjs/forms'

const TypePage = () => {
  //hooks
  // const [currentType, setCurrentType] = useState('')
  const [iconType, setIconType] = useState({
    currentType: '',
    id: null,
  })
  const { currentType, id } = iconType

  const formMethods = useForm({ mode: 'onBlur' })

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
      return { ...state, currentType: '', id: null }
    })
    formMethods.reset()
    formMethods.clearErrors()
  }

  return (
    <BlogLayout>
      <div className="m-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-200 overflow-scroll max-h-72 p-1 rounded-xl">
        <div className="border border-transparent w-max justify-self-center">
          <GoPlusSmall className="w-16 h-16 bg-gray-100 rounded-full p-2 mx-auto" />
          <p className="mx-1 text-xs sm:text-sm md:text-base">Add New</p>
        </div>
        <TypesCell />
      </div>

      <div className="m-20 h-96 bg-gray-200 border border-transparent rounded-xl p-1 grid grid-cols-3 overflow-hidden">
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
              {!currentType ? 'Pick A Icon to Customize' : 'Give it a new name'}
            </Label>
            <TextField
              name="newName"
              validation={{ required: true }}
              errorClassName="error rounded p-1 min-w-full max-w-full"
              className="border border-gray-500 rounded p-1 min-w-full max-w-full"
              placeholder={currentType}
            />
            {currentType ? (
              <FieldError
                name="newName"
                className="error text-xs sm:text-sm md:text-base"
              />
            ) : null}

            <div className="mt-5 flex flex-col">
              <Submit
                className="bg-gray-400 hover:bg-green-300 text-gray py-2 sm:px-4 rounded w-28 mt-5 min-w-full max-w-full text-xs sm:text-sm md:text-base"
                disabled={false}
              >
                Save
              </Submit>

              <button
                onClick={onClick}
                className="bg-gray-400 hover:bg-red-300 text-gray py-2 sm:px-4 rounded w-28 mt-5 min-w-full max-w-full text-xs sm:text-sm md:text-base"
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
        <DefaultTypes setIconType={setIconType} currentType={currentType} />
      </div>
    </BlogLayout>
  )
}

export default TypePage
