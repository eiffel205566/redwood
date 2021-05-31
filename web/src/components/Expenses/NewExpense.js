import React, { Fragment, useEffect } from 'react'
import { Form, Submit, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Check, Garbage, Plus, Cancel, ClockLoading } from '../Misc/svg'
import SingleType from '../DefaultType/SingleType'
import { isTagChosen, Tag } from './Tag'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import { USER_TYPES_QUERY } from 'src/pages/ExpensesPage/UserTypesTagsQuery'
import { v4 as uuidv4 } from 'uuid'
import {
  ADD_ONE_TAG,
  DELETE_TAGS,
  ADD_ONE_EXPENSE,
  UPDATE_ONE_EXPENSE,
  DELETE_ONE_EXPENSE,
} from 'src/components/Misc/Queries'
// import { QUERY } from 'src/components/Misc/Queries'
import { QUERY } from 'src/components/ExpensesCell/ExpensesCell'
import CommonConfirmation from 'src/components/Confirmation/CommonConfirmation'
import { toast } from '@redwoodjs/web/toast'
import { isTypeExpense } from 'src/components/DefaultType/Static'

const NewExpense = ({
  user,
  setTagEditState,
  userTypes,
  iconTypes,
  setNewExpenseState,
  newExpenseState,
  page, //current page number for refetching
  // singleExpense, //used when editing existing expense, null when adding new expense
  needConfirmation,
  setNeedConfirmation,
  setGrandMasterLoadingState,
}) => {
  //Add new Tag
  const [addOneTag, { loading: addOneTagLoading }] = useMutation(ADD_ONE_TAG, {
    onCompleted: () => {
      setNewExpenseState((state) => {
        return {
          ...state,
          newTagName: null,
          isAddingTag: false,
        }
      })
    },
  })

  const [deleteTags, { loading: deleteTagsLoading }] = useMutation(
    DELETE_TAGS,
    {
      onCompleted: () => {
        setNewExpenseState((state) => {
          return {
            ...state,
            newTagName: null,
            isDeletingTag: false,
            chosenTags: [],
          }
        })
      },
    }
  )

  const onHandleTagsDeleteSubmit = async () => {
    try {
      const copyToBeDeletedTagIds = [
        ...newExpenseState.chosenTags.map((tag) => tag.id),
      ]

      //click check when no chosen tag will reset isDeletingTag state
      if (copyToBeDeletedTagIds.length === 0) {
        setNewExpenseState((state) => {
          return {
            ...state,
            newTagName: null,
            isAddingTag: false,
            isDeletingTag: false,
          }
        })
        return
      }

      await deleteTags({
        variables: {
          input: { ids: copyToBeDeletedTagIds },
        },
        update: async (cache) => {
          await cache.writeQuery({
            query: USER_TYPES_QUERY,
            variables: { input: { user } },
            data: {
              userTypes: [
                ...userTypes.map((type) => {
                  if (type.id === newExpenseState.id) {
                    return {
                      ...type,
                      tags: [
                        ...type.tags.filter(
                          (tag) => !copyToBeDeletedTagIds.includes(tag.id)
                        ),
                      ],
                    }
                  } else {
                    return type
                  }
                }),
              ],
            },
          })
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  const onHandleTagEditSubmit = async () => {
    if (newExpenseState.isAddingTag && newExpenseState.newTagName) {
      const newTagAdded = await addOneTag({
        variables: {
          input: {
            tagName: newExpenseState.newTagName,
            expenseType: { id: newExpenseState.id },
          },
        },
        update: (cache) => {
          cache.writeQuery({
            query: USER_TYPES_QUERY,
            variables: { input: { user } },
            data: {
              userTypes: [
                ...userTypes.map((type) => {
                  if (type.id === newExpenseState.id) {
                    return {
                      ...type,
                      tags: [
                        ...type.tags,
                        { __typename: 'Tag', tagName: newExpenseState.tagName },
                      ],
                    }
                  } else {
                    return type
                  }
                }),
              ],
            },
          })
        },
      })
    } else {
      //empty newTag name, cancel
      setNewExpenseState((state) => {
        return {
          ...state,
          newTagName: null,
          isAddingTag: false,
          isDeletingTag: false,
        }
      })
    }
  }

  //amount input handling
  const onChange = (e) => {
    const test = /^\d{1,}(\.(\d){0,2})?/g
    if (e.target.value) {
      //user did enter something in input
      if (e.target.value.toString().match(test)) {
        //if formatted input exist
        const formatedInput = e.target.value.toString().match(test)[0]
        setNewExpenseState((state) => {
          return {
            ...state,
            amount: formatedInput,
          }
        })
      }
    }
  }

  const onDateChange = (e) => {
    setNewExpenseState((state) => {
      return {
        ...state,
        date: e.target.value,
      }
    })
  }

  //submit new expense
  const [createOneExpense, { loading: createOneExpenseLoading }] = useMutation(
    ADD_ONE_EXPENSE,
    {
      onCompleted: () => {
        resetAllState()
      },
      refetchQueries: [{ query: QUERY, variables: { page: +page, user } }],
      awaitRefetchQueries: true,
    }
  )

  const onHandleAddOneExpense = async () => {
    try {
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: true,
        }
      })
      await createOneExpense({
        variables: {
          input: {
            amount: Number(Number(newExpenseState.amount).toFixed(2)),
            user,
            expenseType: { id: newExpenseState.id },
            tags: { ids: [...newExpenseState.chosenTags.map((tag) => tag.id)] },
          },
        },
        //none pagigated version of this function will use "myExpenses" query which ask for user name
        //and return all expenses. paginated version will not return all expenses at once
        // update: async (cache) => {
        //   const { myExpenses } = await cache.readQuery({
        //     query: QUERY, //all user expenses query
        //     variables: { input: user },
        //   })
        //   await cache.writeQuery({
        //     query: QUERY, //all user expenses query
        //     variables: { input: user },
        //     data: {
        //       myExpenses: [
        //         ...myExpenses,
        //         {
        //           __typename: 'Expense',
        //           amount: Number(newExpenseState.amount).toFixed(2),
        //           createdAt: new Date()
        //             .toDateString()
        //             .split(' ')
        //             .slice(1)
        //             .join(' '),
        //           expenseType: {
        //             __typename: 'ExpenseType',
        //             id: newExpenseState.id,
        //           },
        //           tags: [...newExpenseState.chosenTags],
        //         },
        //       ],
        //     },
        //   })
        // },
        // update: async (cache) => {
        //   const data = await cache.readQuery({
        //     query: QUERY, //all user expenses query
        //     variables: { page: 1, user },
        //   })

        //   // console.log(data)

        //   // await cache.writeQuery({
        //   //   query: PAGENATIEDQUERY, //all user expenses query
        //   //   variables: { input: user },
        //   //   data: {
        //   //     expensePage: {
        //   //       myExpenses: [
        //   //         ...myExpenses,
        //   //         {
        //   //           __typename: 'Expense',
        //   //           amount: Number(newExpenseState.amount).toFixed(2),
        //   //           createdAt: new Date()
        //   //             .toDateString()
        //   //             .split(' ')
        //   //             .slice(1)
        //   //             .join(' '),
        //   //           expenseType: {
        //   //             __typename: 'ExpenseType',
        //   //             id: newExpenseState.id,
        //   //           },
        //   //           tags: [...newExpenseState.chosenTags],
        //   //         },
        //   //       ],
        //   //     },
        //   //   },
        //   // })
        // },
      })
      toast.success('New Expense Added')
    } catch (error) {
      console.log(error)
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: false,
        }
      })
    }
  }

  //on handle editing an expense
  const [updateOneExpense, { loading: updateOneExpenseLoading }] = useMutation(
    UPDATE_ONE_EXPENSE,
    {
      onCompleted: () => {
        resetAllState()
      },
      refetchQueries: [{ query: QUERY, variables: { page: +page, user } }],
      awaitRefetchQueries: true,
    }
  )

  //on handle delete one expense
  const [deleteOneExpense, { loading: deleteOneExpenseLoading }] = useMutation(
    DELETE_ONE_EXPENSE,
    {
      onCompleted: () => {
        resetAllState()
      },
      refetchQueries: [{ query: QUERY, variables: { page: +page, user } }],
      awaitRefetchQueries: true,
    }
  )

  const onHandelDeleteOneExpense = async (id) => {
    try {
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: true,
        }
      })
      await deleteOneExpense({
        variables: { id },
      })
      toast.success('Expense Deleted!')
    } catch (error) {
      console.log(error)
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: false,
        }
      })
    }
  }

  //try out master loading
  const masterLoading =
    addOneTagLoading ||
    deleteTagsLoading ||
    createOneExpenseLoading ||
    createOneExpenseLoading ||
    updateOneExpenseLoading

  const onHandleEditOneExpense = async () => {
    try {
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: true,
        }
      })
      await updateOneExpense({
        variables: {
          input: {
            id: newExpenseState.expenseToEdit.id,
            amount: Number(Number(newExpenseState.amount).toFixed(2)),
            expenseType: { id: newExpenseState.id },
            tags: { ids: [...newExpenseState.chosenTags.map((tag) => tag.id)] },
            createdAt: newExpenseState.date,
          },
        },
      })
      toast.success('Edit Expense Success!')
    } catch (error) {
      console.log(error)
      setGrandMasterLoadingState((state) => {
        return {
          ...state,
          grandMasterLoading: false,
        }
      })
    }
  }

  //rest state for cancelling or after mutation
  const resetAllState = () => {
    setTagEditState((state) => {
      return {
        ...state,
        id: null,
        editState: false,
        newTagState: false,
      }
    })
    setNewExpenseState((state) => {
      return {
        ...state,
        id: null,
        expenseToEdit: null,
        tags: null,
        chosenTags: [],
        newTagName: null,
        isAddingTag: false,
        isDeletingTag: false,
        amount: null,
        date: null,
      }
    })
    setGrandMasterLoadingState((state) => {
      return {
        ...state,
        grandMasterLoading: false,
      }
    })
  }

  return (
    <div
      className="backgroundOverlay bg-gray-100 absolute min-h-full min-w-full z-30 bg-opacity-50"
      onKeyDown={() => {}}
      tabIndex="0"
      role="button"
      onClick={(e) => {
        //when user click anywhere else other than the overlaying NewExpense Component
        if (Array.from(e.target.classList).includes('backgroundOverlay')) {
          resetAllState()
        }
      }}
    >
      <Form
        onSubmit={() => console.log(newExpenseState)}
        className="flex flex-col justify-end p-2 border border-transparent rounded-lg h-full xs:h-5/6 sm:w-1/2 w-80 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-hidden"
      >
        <div className="topSection flex-grow flex flex-col select-none">
          <div className="flex justify-between">
            <h3 className="text-sm sm:text-base text-white">{`${
              newExpenseState.expenseToEdit
                ? 'Edit With New Type'
                : 'Pick Expense Type For New Exp'
            }`}</h3>
            <div className="block xs:hidden">
              <Cancel
                onClick={() => {
                  resetAllState()
                }}
                className="h-8 w-8 text-white"
              />
            </div>
          </div>

          <div className="types w-full flex flex-wrap h-40 overflow-y-scroll overflow-x-hidden border-t border-b scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {userTypes &&
              userTypes.map((oneType) => (
                <SingleType
                  id={oneType.id}
                  currentId={newExpenseState.id}
                  key={oneType.id}
                  icon={iconTypes[oneType.description]}
                  description={oneType.description}
                  index={oneType.id}
                  parentClass="w-20 justify-self-center cursor-pointer"
                  iconClass={
                    newExpenseState.id === oneType.id
                      ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto bg-green-300'
                      : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto'
                  }
                  setIconType={setNewExpenseState}
                  newExpenseState={newExpenseState}
                  newName={oneType.newName}
                  currentName={oneType.newName}
                  textColor="text-white"
                  wrapperClass="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 mx-auto"
                  type={isTypeExpense(oneType.description) ? '' : 'income'}
                />
              ))}
          </div>

          <div className="description-w-buttons flex flex-row">
            <h3 className="text-sm sm:text-base text-white">{`${
              newExpenseState.id
                ? `${
                    newExpenseState.isAddingTag
                      ? 'Adding A New Tag'
                      : `${
                          newExpenseState.isDeletingTag
                            ? 'Delete Tags'
                            : 'Choose Your Tags'
                        }`
                  }`
                : 'Pick a Tag'
            }`}</h3>
            <div className="buttons flex flex-row">
              {newExpenseState.id &&
              !newExpenseState.isAddingTag &&
              !newExpenseState.isDeletingTag ? (
                <Wrapper
                  onClick={
                    // addOneTagLoading ||
                    // deleteTagsLoading ||
                    // updateOneExpenseLoading ||
                    // createOneExpenseLoading
                    masterLoading
                      ? () => {}
                      : (e) => {
                          e.stopPropagation()
                          setNewExpenseState((state) => {
                            return {
                              ...state,
                              isDeletingTag: false,
                              isAddingTag: true,
                            }
                          })
                        }
                  }
                  className="text-white hover:text-green-300 cursor-pointer"
                >
                  <Plus className="h-6 w-6" />
                </Wrapper>
              ) : null}
              {newExpenseState.id &&
              !newExpenseState.isAddingTag &&
              !newExpenseState.isDeletingTag ? (
                <Wrapper
                  onClick={
                    // addOneTagLoading ||
                    // deleteTagsLoading ||
                    // updateOneExpenseLoading ||
                    // createOneExpenseLoading
                    masterLoading
                      ? () => {}
                      : (e) => {
                          e.stopPropagation()
                          setNewExpenseState((state) => {
                            return {
                              ...state,
                              isAddingTag: false,
                              isDeletingTag: true,
                            }
                          })
                        }
                  }
                  className="text-white hover:text-red-300 cursor-pointer"
                >
                  <Garbage className="h-6 w-6" />
                </Wrapper>
              ) : null}
              {newExpenseState.isAddingTag || newExpenseState.isDeletingTag ? (
                <Fragment>
                  <Wrapper
                    onClick={
                      // addOneTagLoading ||
                      // deleteTagsLoading ||
                      // updateOneExpenseLoading ||
                      // createOneExpenseLoading
                      masterLoading
                        ? () => {}
                        : newExpenseState.isAddingTag
                        ? onHandleTagEditSubmit
                        : onHandleTagsDeleteSubmit
                    }
                    className="text-white hover:text-gray-300 cursor-pointer"
                  >
                    <Check className="h-6 w-6" />
                  </Wrapper>
                  <Wrapper
                    onClick={
                      // addOneTagLoading ||
                      // deleteTagsLoading ||
                      // updateOneExpenseLoading ||
                      // createOneExpenseLoading
                      masterLoading
                        ? () => {}
                        : (e) => {
                            e.stopPropagation()
                            setNewExpenseState((state) => {
                              return {
                                ...state,
                                isAddingTag: false,
                                newTagName: null,
                                isDeletingTag: false,
                                chosenTags: [],
                              }
                            })
                          }
                    }
                    className="text-white hover:text-gray-300 cursor-pointer"
                  >
                    <Cancel className="h-6 w-6" />
                  </Wrapper>
                </Fragment>
              ) : null}
            </div>
          </div>

          <div className="tagsList border-b w-full flex flex-wrap h-24 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {newExpenseState.isAddingTag || newExpenseState.isDeletingTag ? (
              <Fragment>
                {!newExpenseState.isDeletingTag && (
                  <Wrapper className="h-12">
                    <input
                      onChange={(e) => {
                        setNewExpenseState((state) => {
                          return {
                            ...state,
                            newTagName: e.target.value,
                          }
                        })
                      }}
                      className="rounded-full py-1 px-2 bg-gray-500 text-white w-16 sm:w-32"
                      type="text"
                      placeholder="New Tag"
                      value={
                        newExpenseState.newTagName
                          ? newExpenseState.newTagName
                          : ''
                      }
                    />
                  </Wrapper>
                )}
              </Fragment>
            ) : null}
            {newExpenseState.id
              ? _.find(newExpenseState.types, function (o) {
                  return o.id === newExpenseState.id
                }).tags.map((tag) => (
                  <Tag
                    id={newExpenseState.id}
                    key={tag.id ? tag.id : uuidv4()} //comments!
                    content={tag.tagName}
                    isChosenTag={isTagChosen(
                      newExpenseState.chosenTags,
                      tag.id
                    )}
                    setChosenTags={setNewExpenseState}
                    tagId={tag.id}
                    tagBackground={'bg-gray-500'}
                    isDeletingTag={newExpenseState.isDeletingTag}
                  />
                ))
              : null}
          </div>
          <div className="amount text-white">
            <div className="twoH3Parent w-full flex flex-col">
              <h3 className="text-sm sm:text-base m-1">How much you spend?</h3>
              <Wrapper className="flex-grow" paddingLeft="pl-0">
                <input
                  onChange={onChange}
                  className="h-8 m-1 bg-gray-500 text-white max-w-xs"
                  placeholder="Spending"
                  type="text"
                  value={newExpenseState.amount ? newExpenseState.amount : ''}
                />
              </Wrapper>
            </div>

            {newExpenseState.expenseToEdit ? (
              <div className="twoInput flex flex-col justify-between">
                <h3 className="text-sm sm:text-base m-1">
                  When did you spend?
                </h3>
                <Wrapper className="flex-grow" paddingLeft="pl-0">
                  <input
                    className="h-8 m-1 bg-gray-500 text-white max-w-xs"
                    type="date"
                    value={newExpenseState.date ? newExpenseState.date : ''}
                    onChange={onDateChange}
                  />
                </Wrapper>
              </div>
            ) : null}
          </div>
        </div>

        <div className="bottomButtons border-t text-white flex justify-between">
          {/*
            Cases when Submit should NOT be displayed:
              1. any loading status being true
              2. when isAddintTag or isDeletingTag is true
              3. when newExpenseState.id or newExpenseState.amount is null/undefined
          */}

          {
            // updateOneExpenseLoading ||
            // addOneTagLoading ||
            // deleteTagsLoading ||
            // createOneExpenseLoading
            masterLoading ? (
              <ClockLoading className="h-8 w-8 cursor-not-allowed" />
            ) : newExpenseState.isAddingTag ||
              newExpenseState.isDeletingTag ? null : newExpenseState.id &&
              newExpenseState.amount ? (
              <Check
                onClick={
                  newExpenseState.expenseToEdit
                    ? onHandleEditOneExpense //when expenseToEdit is present, handle editing expense
                    : onHandleAddOneExpense //when expenseToEdit is null, handle adding new expense
                }
                className="h-8 w-8 hover:text-green-300 cursor-pointer"
              />
            ) : null
          }

          {newExpenseState.expenseToEdit ? (
            newExpenseState.isAddingTag ||
            newExpenseState.isDeletingTag ? null : (
              <Garbage
                onClick={() =>
                  setNeedConfirmation((state) => {
                    return {
                      ...state,
                      needToConfirm: true,
                    }
                  })
                }
                className="h-8 w-8 hover:text-red-300 cursor-pointer"
              />
            )
          ) : null}
        </div>
      </Form>
      {needConfirmation.needToConfirm ? (
        <CommonConfirmation
          message="Delete This Expense?"
          needConfirmation={needConfirmation}
          setNeedConfirmation={setNeedConfirmation}
          onHandelDeleteOneExpense={onHandelDeleteOneExpense}
          newExpenseState={newExpenseState}
        />
      ) : null}
    </div>
  )
}

export default NewExpense
