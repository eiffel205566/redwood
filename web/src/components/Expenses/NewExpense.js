import React, { Fragment } from 'react'
import { Form, Submit } from '@redwoodjs/forms'
import { useMutation } from '@redwoodjs/web'
import { Check, Garbage, Plus, Cancel } from '../Misc/svg'
import SingleType from '../DefaultType/SingleType'
import { isTagChosen, Tag } from './Tag'
import { Wrapper } from 'src/components/Misc/UtilityFunc'

const NewExpense = ({
  user,
  setTagEditState,
  userTypes,
  iconTypes,
  setNewExpenseState,
  newExpenseState,
}) => {
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
              isEditingTag: false,
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
          <h3 className="text-white">Choose A Type:</h3>
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
          <h3 className="text-white">Pick Tags:</h3>
          <div className="types w-full flex flex-wrap h-12 overflow-y-scroll overflow-x-hidden">
            {newExpenseState.id
              ? newExpenseState.tags.map((tag) => (
                  <Tag
                    key={tag.id}
                    content={tag.tagName}
                    isChosenTag={isTagChosen(
                      newExpenseState.chosenTags,
                      tag.id
                    )}
                    setChosenTags={setNewExpenseState}
                    tagId={tag.id}
                    tagBackground={'bg-gray-500'}
                  />
                ))
              : null}
            {!newExpenseState.isEditingTag ? (
              <Wrapper
                onClick={(e) => {
                  e.stopPropagation()
                  setNewExpenseState((state) => {
                    return {
                      ...state,
                      isEditingTag: true,
                    }
                  })
                }}
                className="text-white hover:text-gray-300 cursor-pointer"
              >
                <Plus className="h-6 w-6" />
              </Wrapper>
            ) : null}
            {newExpenseState.isEditingTag ? (
              <Fragment>
                <Wrapper className="text-white hover:text-gray-300 cursor-pointer">
                  <Check className="h-6 w-6" />
                </Wrapper>
                <Wrapper
                  onClick={(e) => {
                    e.stopPropagation()
                    setNewExpenseState((state) => {
                      return {
                        ...state,
                        isEditingTag: false,
                      }
                    })
                  }}
                  className="text-white hover:text-gray-300 cursor-pointer"
                >
                  <Cancel className="h-6 w-6" />
                </Wrapper>
              </Fragment>
            ) : null}
          </div>
        </div>

        <div className="bottomButtons text-white flex justify-between">
          <Submit>
            <Check className="h-8 w-8 hover:text-green-300" />
          </Submit>
          <button>
            <Garbage className="h-8 w-8 hover:text-red-300" />
          </button>
        </div>
        {/*
         */}
      </Form>
    </div>
  )
}

export default NewExpense

//inset-1/2 transform -translate-x-1/2 -translate-y-full
