import React from 'react'
import DefaultTypes from './DefaultTypes'
import { useForm } from 'react-hook-form'
import { Customize, Spin } from 'src/components/Misc/svg'
import { useQuery, useMutation } from '@redwoodjs/web'
import { TiArrowRightOutline } from 'react-icons/ti'
import { ClockLoading } from '../Misc/svg'

import {
  Form,
  TextField,
  Submit,
  FieldError,
  Label,
  FormError,
} from '@redwoodjs/forms'

import {
  CREATE_TYPE,
  ALL_USER_ICONS,
  DELETE_TYPE,
  UPDATE_TYPE,
} from '../Misc/Queries'

const DefaultForm = ({
  currentType,
  id,
  currentName,
  iconTypes,
  setIconType,
  user,
  userTypes,
  setTypePageErrorState,
  typePageFormDesc,
  setTypePageFormDesc,
  setNeedConfirm,
  checkState,
}) => {
  const formMethods = useForm({ mode: 'onBlur' })
  const { typePageDescription } = typePageFormDesc

  //form onChange
  const onChange = (e) => {
    //arbitrarily restrict length to 10
    if (e.target.value.length > 10) {
      setTypePageFormDesc((state) => {
        return {
          ...state,
          typePageDescription: e.target.value.substr(0, 10),
        }
      })
    } else {
      setTypePageFormDesc((state) => {
        return {
          ...state,
          typePageDescription: e.target.value,
        }
      })
    }
  }

  //delete user type moved to confirmation

  const onDelete = async () => {
    // reset the input field when user had entered something but click on Delete button
    setTypePageFormDesc((state) => {
      return {
        ...state,
        typePageDescription: '',
      }
    })
    setNeedConfirm((state) => {
      return { ...state, confirmNeeded: true }
    })
    document.body.classList.add('overflow-hidden')
  }

  //create new user type
  const [createType, { loading: createTypeLoading, error: createTypeError }] =
    useMutation(CREATE_TYPE, {
      onCompleted: () => {
        setIconType((state) => {
          return { ...state, currentType: '', id: null, currentName: '' }
        })
        formMethods.reset()
        formMethods.clearErrors()
      },
    })

  const onSubmit = async (data) => {
    //update, when id (in state) is present
    if (id) {
      try {
        await updateType({
          variables: {
            input: {
              id,
              ...data,
            },
          },
          update: (
            cache,
            {
              data: {
                updateExpenseType: { newName },
              },
            }
          ) => {
            cache.writeQuery({
              query: ALL_USER_ICONS,
              variables: { input: { user } },
              data: {
                userTypes: [
                  ...userTypes.map((type) => {
                    if (type.id !== id) {
                      return type
                    } else {
                      return { ...type, newName }
                    }
                  }),
                ],
              },
            })
          },
        })
        //clear input field
        setTypePageFormDesc((state) => {
          return { ...state, typePageDescription: '' }
        })
      } catch (error) {
        // console.log(error)
        setTypePageErrorState((state) => {
          return {
            ...state,
            errorState: true,
            errorMessage: error.message.includes('Unique constraint failed')
              ? 'Duplicated Type, Pleas Enter New Name'
              : 'Error: Please Try Again', //'Please select an icon',
          }
        })
      }
    } else {
      //create new type, no id
      try {
        if (!currentType) throw new Error('Pick A Icon')
        await createType({
          variables: {
            input: {
              ...data,
              description: currentType,
              user,
            },
          },
          update: (cache, { data }) => {
            const { createExpenseType: newType } = data
            cache.writeQuery({
              query: ALL_USER_ICONS,
              variables: { input: { user } },
              data: {
                userTypes: [...userTypes, newType],
              },
            })
          },
        })
        setTypePageFormDesc((state) => {
          return { ...state, typePageDescription: '' }
        })
      } catch (error) {
        // console.log(error.message)
        setTypePageErrorState((state) => {
          return {
            ...state,
            errorState: true,
            errorMessage: error.message.includes('Unique constraint failed')
              ? 'Duplicated Type, Pleas Enter New Name'
              : 'Error: Please Try Again', //'Please select an icon',
          }
        })
      }
    }
  }

  //update type
  const [updateType, { loading: updateTypeLoading }] = useMutation(
    UPDATE_TYPE,
    {
      onCompleted: () => {
        setIconType((state) => {
          return { ...state, currentType: '', id: null, currentName: '' }
        })
        formMethods.reset()
        formMethods.clearErrors()
      },
    }
  )
  //--

  //Cancel button && reset state
  const onClick = (e) => {
    e.preventDefault()
    setIconType((state) => {
      return { ...state, currentType: '', id: null, currentName: '' }
    })
    setTypePageErrorState((state) => {
      return { ...state, errorState: false, errorMessage: null }
    })
    setTypePageFormDesc((state) => {
      return { ...state, typePageDescription: '' }
    })
    formMethods.reset()
    formMethods.clearErrors()
  }

  return (
    <div className="relative select-none mx-5 sm:mx-10 h-64 sm:h-96 bg-sideDark border border-transparent rounded-xl p-1 grid grid-cols-2 sm:grid-cols-3 overflow-hidden">
      <div className="flex flex-col relative">
        {/*!currentType && (
          <TiArrowRightOutline className="h-6 w-6 absolute text-green-300 right-0 animatedArrow top-1 md:top-3 lg:top-5" />
        )*/}
        {currentType ? (
          React.createElement(iconTypes[currentType], {
            className:
              'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto',
          })
        ) : (
          <Customize className="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto" />
        )}
        <Form
          onSubmit={onSubmit}
          validation={{ mode: 'onBlur' }}
          formMethods={formMethods}
          className="ml-3 sm:ml-5"
        >
          <FormError
            wrapperStyle={{ color: 'red', backgroundColor: 'lavenderblush' }}
          />
          <Label className="text-white text-xs sm:text-sm md:text-base mb-1 sm:mb-5 relative">
            {!currentType
              ? 'Pick A Icon to Start'
              : !id
              ? 'Adding New Type'
              : 'Rename Your Type'}
            {!currentType && (
              <div className="h-full w-full absolute top-0  hidden sm:block sm:-right-full animatedArrow">
                <TiArrowRightOutline className="h-6 w-6 text-green-300" />
              </div>
            )}
          </Label>
          <div className="relative">
            <TextField
              name="newName"
              validation={{ required: true }}
              errorClassName="error rounded p-1 min-w-full max-w-full bg-gray-500"
              className="relative border border-gray-500 rounded p-1 min-w-full max-w-full text-sm sm:text-sm md:text-base bg-gray-500 text-white"
              placeholder={currentName ? currentName : currentType}
              onChange={onChange}
              value={typePageDescription}
            ></TextField>
            {/*

              <span className="absolute text-white right-0 top-1 sm:top-0 text-gray-400 pr-1 sm:p-1 h-full text-sm sm:text-sm md:text-base">
                {`${typePageFormDesc.typePageDescription.length}/10`}
              </span>
            */}

            <div className="absolute h-full top-0 right-0 flex flex-col justify-center pr-1">
              <span className="text-gray-400 text-xs">
                {`${typePageFormDesc.typePageDescription.length}/10`}
              </span>
            </div>
          </div>

          {currentType ? (
            <FieldError
              name="newName"
              className="error text-xs sm:text-sm whitespace-nowrap"
            />
          ) : null}
          {/*

            */}

          <div className="typePageButtons flex flex-col">
            <Submit
              className={`${
                createTypeLoading || updateTypeLoading
                  ? 'cursor-not-allowed'
                  : ''
              } bg-gray-400 hover:bg-green-300 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base`}
              disabled={createTypeLoading || updateTypeLoading}
            >
              {createTypeLoading || updateTypeLoading ? (
                <ClockLoading className="h-6 w-6 text-gray-500 mx-auto" />
              ) : (
                'Submit'
              )}
            </Submit>

            {/*eslint-disable*/}
            <div
              onClick={onClick}
              disabled={createTypeLoading || updateTypeLoading}
              className="bg-gray-400 hover:bg-red-300 text-gray py-2 sm:px-4 rounded border-transparent text-center w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base cursor-pointer"
            >
              Cancel
            </div>

            {currentName && (
              <div
                onClick={onDelete}
                disabled={createTypeLoading || updateTypeLoading}
                className={`${
                  createTypeLoading || updateTypeLoading
                    ? 'cursor-not-allowed'
                    : ''
                } bg-gray-400 hover:bg-red-700 text-gray py-2 sm:px-4 rounded w-28 mt-2 min-w-full max-w-full text-xs sm:text-sm md:text-base text-center cursor-pointer`}
              >
                {createTypeLoading || updateTypeLoading ? (
                  <ClockLoading className="h-6 w-6 text-gray-500 mx-auto" />
                ) : (
                  'Delete'
                )}
              </div>
            )}
          </div>
          {/*eslint-enable*/}
        </Form>
      </div>
      <DefaultTypes
        setIconType={setIconType}
        currentType={currentType}
        id={id}
        checkState={checkState}
      />
    </div>
  )
}

export default DefaultForm
