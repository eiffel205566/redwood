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
} from 'src/components/Misc/Queries'
import { QUERY } from 'src/components/ExpensesCell/ExpensesCell'

const NewExpense = ({
  user,
  setTagEditState,
  userTypes,
  iconTypes,
  setNewExpenseState,
  newExpenseState,
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

  //submit new expense
  const [createOneExpense, { loading: createOneExpenseLoading }] = useMutation(
    ADD_ONE_EXPENSE,
    {
      onCompleted: () => {
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
            tags: null,
            chosenTags: [],
            newTagName: null,
            isAddingTag: false,
            isDeletingTag: false,
            amount: null,
          }
        })
      },
    }
  )

  const onHandleAddOneExpense = async () => {
    try {
      await createOneExpense({
        variables: {
          input: {
            amount: Number(newExpenseState.amount).toFixed(2),
            user,
            expenseType: { id: newExpenseState.id },
            tags: { ids: [...newExpenseState.chosenTags.map((tag) => tag.id)] },
          },
        },
        update: async (cache) => {
          const { myExpenses } = await cache.readQuery({
            query: QUERY, //all user expenses query
            variables: { input: user },
          })
          await cache.writeQuery({
            query: QUERY, //all user expenses query
            variables: { input: user },
            data: {
              myExpenses: [
                ...myExpenses,
                {
                  __typename: 'Expense',
                  amount: Number(newExpenseState.amount).toFixed(2),
                  createdAt: new Date()
                    .toDateString()
                    .split(' ')
                    .slice(1)
                    .join(' '),
                  expenseType: {
                    __typename: 'ExpenseType',
                    id: newExpenseState.id,
                  },
                  tags: [...newExpenseState.chosenTags],
                },
              ],
            },
          })
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div
      className="backgroundOverlay bg-gray-100 absolute min-h-full min-w-full z-30 bg-opacity-50"
      onClick={(e) => {
        //when user click anywhere else other than the overlaying NewExpense Component
        if (Array.from(e.target.classList).includes('backgroundOverlay')) {
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
              tags: null,
              chosenTags: [],
              newTagName: null,
              isAddingTag: false,
              isDeletingTag: false,
              amount: null,
            }
          })
        }
      }}
    >
      <Form
        onSubmit={() => console.log(newExpenseState)}
        className="flex flex-col justify-end p-2 border border-transparent rounded-lg h-2/3 sm:w-1/2 w-80 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="topSection flex-grow flex flex-col select-none">
          <h3 className="text-white">Pick An Expense Type</h3>
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
                      ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto bg-green-300'
                      : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto'
                  }
                  setIconType={setNewExpenseState}
                  newExpenseState={newExpenseState}
                  newName={oneType.newName}
                  currentName={oneType.newName}
                  textColor="text-white"
                />
              ))}
          </div>

          <div className="description-w-buttons flex flex-row">
            <h3 className="text-white">{`${
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
                    addOneTagLoading || deleteTagsLoading
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
                    addOneTagLoading || deleteTagsLoading
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
                      addOneTagLoading || deleteTagsLoading
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
                      addOneTagLoading || deleteTagsLoading
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
            <h3>How much did you expend?</h3>
            <Wrapper paddingLeft="pl-0">
              <input
                onChange={onChange}
                className="py-1 px-2 bg-gray-500 text-white w-48"
                placeholder="Spending"
                type="text"
                value={newExpenseState.amount ? newExpenseState.amount : ''}
              />
            </Wrapper>
          </div>
        </div>

        <div className="bottomButtons border-t text-white flex justify-between">
          {/*
            Cases when Submit should NOT be displayed:
              1. any loading status being true
              2. when isAddintTag or isDeletingTag is true
              3. when newExpenseState.id or newExpenseState.amount is null/undefined
          */}

          {addOneTagLoading || deleteTagsLoading ? (
            <ClockLoading className="h-8 w-8 cursor-not-allowed" />
          ) : newExpenseState.isAddingTag ||
            newExpenseState.isDeletingTag ? null : newExpenseState.id &&
            newExpenseState.amount ? (
            <Check
              onClick={onHandleAddOneExpense}
              className="h-8 w-8 hover:text-green-300 cursor-pointer"
            />
          ) : null}
        </div>
      </Form>
    </div>
  )
}

export default NewExpense
