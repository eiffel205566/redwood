import React from 'react'
import { Form } from '@redwoodjs/forms'
import { Cancel } from '../Misc/svg'

const SummarySettings = ({ typeCategoryState, setTypeCategoryState }) => {
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
      <Form className="flex flex-col justify-end p-2 border border-transparent rounded-lg h-full xs:h-5/6 sm:w-1/2 w-80 absolute background bg-overlay inset-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-y-hidden">
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
        </div>
      </Form>
    </div>
  )
}

export default SummarySettings
