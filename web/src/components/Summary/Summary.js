import React, { Fragment, useState } from 'react'
import * as _ from 'lodash'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import SingleType from 'src/components/DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'
import { Calender, Cog, Money, Spin } from '../Misc/svg'
import { calculateWidth } from 'src/components/Misc/UtilityFunc'
import SummaryChart from './SummaryChart'
import BreakdownChart from './BreakdownChart'
const CALENDER = 'CALENDER'

const Summary = ({
  expenseByType,
  expenseByDate,
  typeCategoryState,
  setTypeCategoryState,
  ...rest
}) => {
  const { types } = typeCategoryState
  //* -- calculations and preparation for charts
  const sortByAbsoluteValueExpenseByType = expenseByType
    ? [...expenseByType].sort((a, b) => {
        return Math.abs(b._sum.amount) - Math.abs(a._sum.amount)
      })
    : []
  const maxExpenseValue = sortByAbsoluteValueExpenseByType[0]?._sum?.amount
    ? sortByAbsoluteValueExpenseByType[0]?._sum?.amount
    : 1
  const isSomethingToShow = Boolean(sortByAbsoluteValueExpenseByType.length) //whether there is data to show
  //* --

  //* local state
  const [settingButtonState, setSettingButtonState] = useState({
    cogSpinning: false,
    extendSettings: false,
    resetSpinning: false,
    editCalenderSetting: false,
  })
  {
    /*
    {"createdAt": "2021-05-11T00:00:00.000Z","_sum": {"amount": -110}},
    */
  }

  //* reset button handler
  const onHandleReset = (e) => {
    setTypeCategoryState((state) => {
      return {
        ...state,
        typeToEdit: null,
        chosenTags: [...state.availableTags],
        minDate: null,
        maxDate: null,
      }
    })
  }

  return (
    <Fragment>
      <div className="settingButtons relative flex w-full h-12 text-white">
        <button
          onMouseEnter={() => {
            setSettingButtonState((state) => {
              return {
                ...state,
                cogSpinning: true,
              }
            })
          }}
          onMouseLeave={() => {
            setSettingButtonState((state) => {
              return {
                ...state,
                cogSpinning: false,
              }
            })
          }}
          onClick={() => {
            setSettingButtonState((state) => {
              return {
                ...state,
                extendSettings: !state.extendSettings,
              }
            })
          }}
          className="bg-transparent w-10 h-full bg-displayOnly focus:outline-none text-gray-300 hover:text-green-500 border border-transparent hover:border-transparent rounded"
        >
          <Cog
            className={`theSpin ${
              settingButtonState.cogSpinning ? 'animate-spin' : ''
            } w-6 h-full m-auto`}
          />
        </button>
        {/*

        */}
        <div className="settingButtons relative h-full overflow-hidden flex-grow flex">
          <button
            onClick={onHandleReset}
            onMouseEnter={() => {
              setSettingButtonState((state) => {
                return {
                  ...state,
                  resetSpinning: true,
                }
              })
            }}
            onMouseLeave={() => {
              setSettingButtonState((state) => {
                return {
                  ...state,
                  resetSpinning: false,
                }
              })
            }}
            className={`bg-transparent absolute ${
              settingButtonState.extendSettings ? 'left-2' : '-left-10'
            } transform transition-all duration-500 ease-in-out w-10 h-full bg-displayOnly focus:outline-none text-gray-300 hover:text-green-500 border border-transparent hover:border-transparent rounded`}
          >
            <Spin
              className={`w-6 h-full m-auto ${
                settingButtonState.resetSpinning ? 'animate-spin' : ''
              }`}
            />
          </button>
          <button
            onClick={() => {
              setTypeCategoryState((state) => {
                return {
                  ...state,
                  typeToEdit: { CALENDER: true },
                }
              })
              document.body.classList.add('overflow-hidden')
            }}
            onMouseEnter={() => {
              setSettingButtonState((state) => {
                return {
                  ...state,
                  editCalenderSetting: true,
                }
              })
            }}
            onMouseLeave={() => {
              setSettingButtonState((state) => {
                return {
                  ...state,
                  editCalenderSetting: false,
                }
              })
            }}
            className={`bg-transparent absolute ${
              settingButtonState.extendSettings ? 'left-14' : '-left-20'
            } transform transition-all duration-500 ease-in-out w-10 h-full bg-displayOnly focus:outline-none text-gray-300 hover:text-green-500 border border-transparent hover:border-transparent rounded`}
          >
            <Calender className="w-6 h-full m-auto" />
          </button>
        </div>

        <div className="tooltip text-white absolute top-0 left-36 h-full flex flex-col justify-center">
          <span>
            {settingButtonState.cogSpinning
              ? settingButtonState.extendSettings
                ? 'Hide Settings'
                : 'View Settings'
              : settingButtonState.resetSpinning
              ? 'Reset Settings'
              : settingButtonState.editCalenderSetting
              ? 'Edit Date Range'
              : ''}
          </span>
        </div>
      </div>

      {!isSomethingToShow && (
        <div className="emptyInfoMessage text-red-500">
          No Insight, please go to Expense page to add new entry for the
          period...
        </div>
      )}

      <div className="textInsightSection relative text-white w-full h-48 mb-1 border border-gray-500">
        <SummaryChart expenseByDate={expenseByDate} />
      </div>
      <section className="numberInsightsection text-displayOnly flex flex-col md:flex-row">
        {/*

        */}
        <div className="typeRank max-h-96 flex-grow overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500">
          {sortByAbsoluteValueExpenseByType.map((oneType, index) => {
            const singleType = _.find(types, function (o) {
              return o.id === oneType.expenseTypeId
            })
            return (
              <div className="flex sm:mb-1 bg-sideDark" key={index}>
                <Wrapper className="cursor-default">
                  <SingleType
                    icon={
                      singleType?.description
                        ? iconTypes[singleType?.description]
                        : iconTypes['CREDIT_CARD']
                    }
                    newName={
                      singleType?.newName ? singleType?.newName : 'default'
                    }
                    parentClass="w-12 sm:w-20"
                    iconClass="mx-auto h-6 w-6 text-displayOnly"
                    noHoverNeeded={true}
                    textColor="text-displayOnly"
                    type={
                      isTypeExpense(singleType?.description) ? '' : 'income'
                    }
                  />
                </Wrapper>
                {/*eslint-disable*/}
                <Wrapper>
                  <div
                    onClick={() => {
                      setTypeCategoryState((state) => {
                        return {
                          ...state,
                          typeToEdit: oneType,
                        }
                      })
                      document.body.classList.add('overflow-hidden')
                    }}
                    onKeyDown={() => {}}
                    // tabIndex="0"
                    // role="button"
                    className="rank m-2 h-full w-60 border border-gray-500 pointer-default"
                  >
                  {/*eslint-enable*/}
                    <div
                      className={`rankBarContent transform transition-all duration-500 hover:bg-green-300 cursor-pointer ease-in-out w-${calculateWidth(
                        Math.abs(oneType._sum.amount),
                        Math.abs(maxExpenseValue)
                      )} h-full`}
                    ></div>
                  </div>
                </Wrapper>
                <Wrapper
                  className="flex-grow text-center cursor-default pr-5"
                  paddingLeft="no"
                >
                  <div className="hidden sm:block">{` $${
                    Math.abs(oneType._sum.amount) > 9999
                      ? '>9999'
                      : Math.abs(oneType._sum.amount)
                  }`}</div>
                </Wrapper>
              </div>
            )
          })}
        </div>

        <div className="typeRank h-96 flex-grow border border-gray-500 relative">
          <BreakdownChart
            expenseByType={expenseByType}
            typeCategoryState={typeCategoryState}
          />
        </div>
        {/*
          <Wrapper>
            <div className="rankBar m-2 h-full w-32 md:w-80 "></div>
          </Wrapper>

        */}
      </section>
    </Fragment>
  )
}

export default Summary
