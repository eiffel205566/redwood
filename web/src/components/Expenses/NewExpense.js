import React, { Fragment, useEffect } from 'react'
import { Form, Submit, TextField } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Check, Garbage, Plus, Cancel } from '../Misc/svg'
import SingleType from '../DefaultType/SingleType'
import { isTagChosen, Tag } from './Tag'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import { USER_TYPES_QUERY } from 'src/pages/ExpensesPage/UserTypesTagsQuery'
import { v4 as uuidv4 } from 'uuid'
import { ADD_ONE_TAG, DELETE_TAGS } from 'src/components/Misc/Queries'

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
      // refetchQueries: [
      //   { query: USER_TYPES_QUERY, variables: { input: { user } } },
      // ],
      // awaitRefetchQueries: true,
    }
  )

  const onHandleTagsDeleteSubmit = async () => {
    try {
      const copyToBeDeletedTagIds = [
        ...newExpenseState.chosenTags.map((tag) => tag.id),
      ]
      await deleteTags({
        variables: {
          input: { ids: copyToBeDeletedTagIds },
        },
        update: async (cache) => {
          const existingData = await cache.readQuery({
            query: USER_TYPES_QUERY,
            variables: { input: { user } },
          })

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
                        ...type.tags
                          .filter(
                            (tag) => !copyToBeDeletedTagIds.includes(tag.id)
                          )
                          .map((tag) => {
                            return { ...tag, __typename: 'Tag' }
                          }),
                      ],
                    }
                  } else {
                    return type
                  }
                }),
              ],
            },
          })

          const updatedData = await cache.readQuery({
            query: USER_TYPES_QUERY,
            variables: { input: { user } },
          })

          // console.log(existingData)
          // console.log(updatedData)
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

  return (
    <div
      className="backgroundOverlay bg-gray-100 absolute min-h-full min-w-full z-30 bg-opacity-50"
      onClick={(e) => {
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
            }
          })
        }
      }}
    >
      <Form
        onSubmit={() => {}}
        className="flex flex-col justify-end p-2 border border-transparent rounded-lg h-2/3 sm:w-1/2 w-80 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="topSection flex-grow flex flex-col select-none">
          <h3 className="text-white">Pick An Expense Type</h3>
          <div className="types w-full flex flex-wrap h-40 overflow-y-scroll overflow-x-hidden">
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
                  newName={oneType.newName}
                  currentName={oneType.newName}
                  textColor="text-white"
                />
              ))}
          </div>
          <h3 className="text-white">{`${
            newExpenseState.id
              ? `${
                  newExpenseState.isAddingTag
                    ? 'Adding Tag'
                    : `${
                        newExpenseState.isDeletingTag
                          ? 'Delete Tag'
                          : 'Pick a Tag'
                      }`
                }`
              : 'Pick a Tag'
          }`}</h3>
          <div className="types w-full flex flex-wrap h-12 overflow-y-scroll overflow-x-hidden">
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
                {!newExpenseState.isDeletingTag && (
                  <Wrapper>
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
        </div>

        <div className="bottomButtons text-white flex justify-between">
          {/*

          <Submit disabled={addOneTagLoading || deleteTagsLoading}>
            <Check className="h-8 w-8 hover:text-green-300" />
          </Submit>
          <button disabled={addOneTagLoading || deleteTagsLoading}>
            <Garbage className="h-8 w-8 hover:text-red-300" />
          </button>
        */}
        </div>
        {/*
         */}
      </Form>
    </div>
  )
}

export default NewExpense

//inset-1/2 transform -translate-x-1/2 -translate-y-full
