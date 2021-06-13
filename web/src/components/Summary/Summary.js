import React, { Fragment } from 'react'
import * as _ from 'lodash'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import SingleType from 'src/components/DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'
import { Money } from '../Misc/svg'
import { calculateWidth } from 'src/components/Misc/UtilityFunc'
import SummaryChart from './SummaryChart'

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

  //* --
  {
    /*
    {"createdAt": "2021-05-11T00:00:00.000Z","_sum": {"amount": -110}},
    */
  }

  return (
    <Fragment>
      <div className="textInsightSection relative text-white w-full h-48 border border-red-300 mb-1">
        <SummaryChart expenseByDate={expenseByDate} />
      </div>
      <section className="numberInsightsection text-displayOnly flex flex-col md:flex-row">
        {/*

        */}
        <div className="typeRank max-h-96 flex-grow border border-yellow-300 overflow-x-hidden overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-500">
          {sortByAbsoluteValueExpenseByType.map((oneType, index) => {
            const singleType = _.find(types, function (o) {
              return o.id === oneType.expenseTypeId
            })
            return (
              <div className="flex sm:m-1 bg-sideDark" key={index}>
                <Wrapper>
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

                <Wrapper>
                  <div
                    onClick={() => {
                      setTypeCategoryState((state) => {
                        return {
                          ...state,
                          typeToEdit: oneType,
                        }
                      })
                    }}
                    onKeyDown={() => {}}
                    tabIndex="0"
                    role="button"
                    className="rank m-2 h-full w-60 border border-gray-500 "
                  >
                    <div
                      className={`rankBarContent transform transition-all duration-500 hover:bg-green-300 cursor-pointer ease-in-out w-${calculateWidth(
                        Math.abs(oneType._sum.amount),
                        Math.abs(maxExpenseValue)
                      )} h-full`}
                    ></div>
                  </div>
                </Wrapper>
                <Wrapper className="flex-grow text-center">
                  <div className="hidden sm:block">{` $ ${oneType._sum.amount}`}</div>
                </Wrapper>
              </div>
            )
          })}
        </div>

        <div className="typeRank h-20 flex-grow border border-green-300">
          <Wrapper>
            <div className="rankBar m-2 h-full w-32 md:w-80 "></div>
          </Wrapper>
        </div>
      </section>
    </Fragment>
  )
}

export default Summary
