import React, { useState, useEffect } from 'react'
import { Form } from '@redwoodjs/forms'
import { Cancel, Check, Plus, Detail, Back } from '../Misc/svg'
import SingleType from '../DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'
import { Wrapper } from '../Misc/UtilityFunc'
import { Tag, isTagChosen } from '../Expenses/Tag'
import { v4 as uuidv4 } from 'uuid'
import { SummaryDetails } from './SummaryDetails'
const CALENDER = 'CALENDER'

const SummarySettings = ({
  typeCategoryState,
  setTypeCategoryState,
  userTypes,
  user,
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

  //Local state to display expenses
  const [displayState, setDisplayState] = useState({
    displayExpenses: false,
  })

  return (
    <div
      className="backgroundOverlay cursor-default bg-gray-100 absolute min-h-full min-w-full z-30 bg-opacity-50 overflow-y-hidden"
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
          document.body.classList.remove('overflow-hidden')
        }
      }}
    >
      <Form
        className={`flex flex-col ${
          displayState.displayExpenses ? '' : 'justify-end'
        } p-2 border border-transparent rounded-lg h-full xs:h-3/4 ${
          displayState.displayExpenses ? 'w-80' : 'sm:w-1/2 w-80'
        } absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}
      >
        {/*
        <Form
          className={`flex flex-col ${
            displayState.displayExpenses ? '' : 'justify-end'
          } p-2 border border-transparent rounded-lg h-full xs:h-3/4 sm:w-1/2 w-80 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2`}
        >

      */}
        <div
          className={`topSection ${
            displayState.displayExpenses ? '' : 'flex-grow'
          } flex flex-col select-none`}
        >
          <div className="flex justify-between">
            <Wrapper className="cursor-default">
              <h3 className="text-xs sm:text-sm text-white">{`${
                typeCategoryState.typeToEdit
                  ? Object.keys(typeCategoryState.typeToEdit).includes(CALENDER)
                    ? 'Edit Date Range'
                    : `Total ${
                        typeCategoryState.typeToEdit?._sum?.amount &&
                        typeCategoryState.typeToEdit?._sum?.amount > 0
                          ? 'Income'
                          : 'Expense'
                      }: $${
                        typeCategoryState.typeToEdit?._sum?.amount
                          ? typeCategoryState.typeToEdit?._sum?.amount
                          : ''
                      }`
                  : 'Pick Expense Type For New Exp'
              }`}</h3>
            </Wrapper>

            {!Object.keys(typeCategoryState.typeToEdit).includes(CALENDER) && (
              <div className="h-full flex">
                <Wrapper className="text-white cursor-default">
                  <h3 className="text-xs sm:text-sm">
                    {displayState.displayExpenses ? 'Back' : 'Details'}
                  </h3>
                </Wrapper>
                <Wrapper
                  onClick={() => {
                    setDisplayState((state) => {
                      return {
                        ...state,
                        displayExpenses: !state.displayExpenses,
                      }
                    })
                  }}
                  className="text-white hover:text-green-300"
                >
                  {displayState.displayExpenses ? (
                    <Back className="h-6 w-6 sm:h-8 sm:w-8" />
                  ) : (
                    <Detail className="h-6 w-6 sm:h-8 sm:w-8" />
                  )}
                </Wrapper>
              </div>
            )}

            <div className="block xs:hidden">
              <Cancel
                onClick={() => {
                  setTypeCategoryState((state) => {
                    return {
                      ...state,
                      typeToEdit: null,
                    }
                  })
                  document.body.classList.remove('overflow-hidden')
                }}
                className="h-6 w-6 sm:h-8 sm:w-8 text-white"
              />
            </div>
            {/* eslint-disable */}
          </div>

          {/* the type icon  */}
          {!displayState.displayExpenses && <div className="types w-full flex flex-wrap h-16 md:h-24 overflow-y-scroll overflow-x-hidden border-t border-b scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {typeCategoryState.types &&
              typeCategoryState.types.length &&
              typeCategoryState.types.map((oneType) => {
                if (oneType.id === typeCategoryState.typeToEdit.expenseTypeId) {
                  return (
                    <SingleType
                      id={oneType?.id}
                      currentId={typeCategoryState?.id}
                      key={oneType?.id}
                      icon={iconTypes[oneType?.description]}
                      description={oneType?.description}
                      index={oneType?.id}
                      parentClass="w-20 justify-self-center"
                      iconClass="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto bg-green-300"
                      newName={oneType.newName}
                      currentName={oneType?.newName}
                      textColor="text-white"
                      wrapperClass="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 mx-auto"
                      type={isTypeExpense(oneType?.description) ? '' : 'income'}
                    />
                  )
                }
              })}
          </div>}

          {/**/}

          {!displayState.displayExpenses && <div className="description-w-buttons flex flex-row">
            <h3 className="text-sm sm:text-base text-white">
              {`${Object.keys(typeCategoryState.typeToEdit).includes(CALENDER) ? "" : "What Tags To Include For The Type?"}`}
            </h3>
            <div className="buttons flex flex-row">
            </div>
          </div>}

          {!displayState.displayExpenses && <div className="tagsList border-b w-full flex flex-wrap h-24 overflow-y-scroll overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            {typeCategoryState.typeToEdit && !Object.keys(typeCategoryState.typeToEdit).includes(CALENDER) //when SummarySetting showed up by user click Calender, typeToEdit is {} with no props
              ? _.find(typeCategoryState.types, function (o) {
                  return o.id === typeCategoryState.typeToEdit.expenseTypeId
                }).tags?.map((tag) => (
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
          </div>}
        </div>

        {/*
          detail expense sections
          <div className="h-6 w-full bg-green-300"></div>
        */}

        {displayState.displayExpenses ? <SummaryDetails typeCategoryState={typeCategoryState} user={user}/> : null}

        {!displayState.displayExpenses && <div className="bottomButtons border-t text-white flex justify-between">
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
                    document.body.classList.remove('overflow-hidden')
                  }
                }
                className="h-6 w-6 sm:h-8 sm:w-8 hover:text-green-300 cursor-pointer"
              />
            ) : null
          }
        </div>}
      </Form>

    </div>
  )
}

export default SummarySettings

