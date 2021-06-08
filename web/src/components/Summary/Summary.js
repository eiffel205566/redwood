import React, { Fragment } from 'react'
import * as _ from 'lodash'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import SingleType from 'src/components/DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'
import { Money } from '../Misc/svg'
import { calculateWidth } from 'src/components/Misc/UtilityFunc'

const Summary = ({
  expenseByType,
  typeCategoryState,
  setTypeCategoryState,
  ...rest
}) => {
  const { types } = typeCategoryState
  //need utility function to calculate width: calculateWidth
  //need to get maxiumum value
  const sortByAbsoluteValueExpenseByType = expenseByType
    ? [...expenseByType].sort((a, b) => {
        return Math.abs(b._sum.amount) - Math.abs(a._sum.amount)
      })
    : []
  const maxExpenseValue = sortByAbsoluteValueExpenseByType[0]?._sum?.amount
    ? sortByAbsoluteValueExpenseByType[0]?._sum?.amount
    : 1

  return (
    <Fragment>
      <div className="textInsightSection text-white w-full max-h-24 border border-red-300 mb-1">
        <h1>xx</h1>
        <h1>xx</h1>
        <h1>xx</h1>
        <h1>xx</h1>
      </div>
      <section className="numberInsightsection text-displayOnly flex flex-col md:flex-row">
        <div className="typeRank border border-yellow-300 max-h-96 flex-grow">
          {sortByAbsoluteValueExpenseByType.map((oneType, index) => {
            const singleType = _.find(types, function (o) {
              return o.id === oneType.expenseTypeId
            })

            return (
              <div
                className="flex border border-gray-300 m-1 bg-sideDark"
                key={index}
              >
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
                  {/*
                  <Money />
                */}
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
                {/*
                 */}
              </div>
            )
          })}
        </div>
        <div className="typeRank border border-blue-300 h-20 flex-grow">
          <Wrapper>
            <div className="rankBar m-2 h-full w-40 md:w-80 border border-green-500 "></div>
          </Wrapper>
        </div>
      </section>
    </Fragment>
  )
}

export default Summary
