import React, { useState, useEffect } from 'react'
import { Form } from '@redwoodjs/forms'
import { Cancel, Check, Plus } from '../Misc/svg'
import SingleType from '../DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'
import { Wrapper } from '../Misc/UtilityFunc'
import { Tag, isTagChosen } from '../Expenses/Tag'
import { v4 as uuidv4 } from 'uuid'

const SummarySettings = ({
  typeCategoryState,
  setTypeCategoryState,
  userTypes,
}) => {
  //start a localChosenTagState to store all tags information in SummarySettings
  //so get ability to control how user interact with Tag click
  //only when Check component is clicked should chosenTag be updated in SummaryPage
  //which then will trigger cell to re-query and re-render the page
  const [localChosenTagState, setlocalChosenTagState] = useState({
    chosenTags: [],
  })

  useEffect(() => {
    setlocalChosenTagState((state) => {
      return {
        ...state,
        chosenTags: typeCategoryState.chosenTags,
      }
    })
  }, [typeCategoryState.chosenTags])

  return (
    <div
      className="backgroundOverlay cursor-default bg-gray-100 absolute min-h-full min-w-full z-30 bg-opacity-50"
      onKeyDown={() => {}}
      tabIndex="0"
      role="button"
      onClick={(e) => {
        //when user click anywhere else other than the overlaying NewExpense Component
        if (Array.from(e.target.classList).includes('backgroundOverlay')) {
          //reset state remove Overlay
          setTypeCategoryState((state) => {
            return {
              ...state,
              typeToEdit: null,
            }
          })
        }
      }}
    >
      <Form className="flex flex-col justify-end p-2 border border-transparent rounded-lg h-full xs:h-3/4 sm:w-1/2 w-80 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-hidden">
        <div className="topSection flex-grow flex flex-col select-none">
          <div className="flex justify-between">
            <h3 className="text-sm sm:text-base text-white">{`${
              typeCategoryState.typeToEdit
                ? 'Edit With New Type'
                : 'Pick Expense Type For New Exp'
            }`}</h3>
            <div className="block xs:hidden">
              <Cancel
                onClick={() => {
                  setTypeCategoryState((state) => {
                    return {
                      ...state,
                      typeToEdit: null,
                    }
                  })
                }}
                className="h-8 w-8 text-white"
              />
            </div>
          </div>
          {/* eslint-disable */}
          <div className="types w-full flex flex-wrap h-40 overflow-y-scroll overflow-x-hidden border-t border-b scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {typeCategoryState.types &&
              typeCategoryState.types.length &&
              typeCategoryState.types.map((oneType) => {
                if (oneType.id === typeCategoryState.typeToEdit.expenseTypeId) {
                  return (
                    <SingleType
                      id={oneType.id}
                      currentId={typeCategoryState.id}
                      key={oneType.id}
                      icon={iconTypes[oneType.description]}
                      description={oneType.description}
                      index={oneType.id}
                      parentClass="w-20 justify-self-center"
                      iconClass="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto bg-green-300"
                      newName={oneType.newName}
                      currentName={oneType.newName}
                      textColor="text-white"
                      wrapperClass="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 mx-auto"
                      type={isTypeExpense(oneType.description) ? '' : 'income'}
                    />
                  )
                }
              })}
          </div>

          {/**/}
          <div className="description-w-buttons flex flex-row">
            <h3 className="text-sm sm:text-base text-white">
              What Tags To Include For The Type?
            </h3>
            <div className="buttons flex flex-row">
            </div>
          </div>
          <div className="tagsList border-b w-full flex flex-wrap h-24 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {typeCategoryState.typeToEdit
              ? _.find(typeCategoryState.types, function (o) {
                  return o.id === typeCategoryState.typeToEdit.expenseTypeId
                }).tags.map((tag) => (
                  <Tag
                    id={typeCategoryState.typeToEdit.expenseTypeId}
                    key={tag.id ? tag.id : uuidv4()}
                    content={tag.tagName}
                    tagId={tag.id}
                    tagBackground={'bg-gray-500'}
                    isChosenTag={localChosenTagState.chosenTags.filter((t) => t.id === tag.id).length}
                    setChosenTags={setTypeCategoryState}
                    newTagClickHanlderNeeded={true}
                    setlocalChosenTagState={setlocalChosenTagState}
                    typeCategoryState={typeCategoryState}
                  />
                ))
              : null}
          </div>
        </div>

        <div className="bottomButtons border-t text-white flex justify-between">
          {
            false ? (
              <ClockLoading className="h-8 w-8 cursor-not-allowed" />
            ) : true ? (
              <Check
                onClick={
                  () => {
                    setTypeCategoryState((state) => {
                      return {
                        ...state,
                        typeToEdit: null,
                        chosenTags: [...localChosenTagState.chosenTags]
                      }
                    })
                  }
                }
                className="h-8 w-8 hover:text-green-300 cursor-pointer"
              />
            ) : null
          }
        </div>

      </Form>
    </div>
  )
}

export default SummarySettings

