import React, { Fragment } from 'react'
import * as _ from 'lodash'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import SingleType from 'src/components/DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'

const Summary = ({
  textExpenseByType,
  typeCategoryState,
  setTypeCategoryState,
  ...rest
}) => {
  const { types } = typeCategoryState

  return (
    <Fragment>
      <div className="textInsightSection text-white w-full max-h-24 border border-red-300 m-1">
        <h1>xx</h1>
        <h1>xx</h1>
        <h1>xx</h1>
        <h1>xx</h1>
      </div>
      <section className="numberInsightsection text-displayOnly flex">
        <div className="typeRank border border-yellow-300 max-h-96 flex-grow m-1">
          {textExpenseByType.map((oneType, index) => {
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
                      singleType.description
                        ? iconTypes[singleType.description]
                        : iconTypes['CREDIT_CARD']
                    }
                    newName={
                      singleType.newName ? singleType.newName : 'default'
                    }
                    parentClass="w-16 sm:w-20"
                    iconClass="mx-auto h-6 w-6 text-displayOnly"
                    noHoverNeeded={true}
                    textColor="text-displayOnly"
                    type={isTypeExpense(singleType.description) ? '' : 'income'}
                  />
                </Wrapper>

                <Wrapper>
                  <div>{` : $ ${oneType.sum.amount}`}</div>
                </Wrapper>
              </div>
            )
          })}
        </div>
        <div className="typeRank border border-blue-300 h-20 flex-grow m-1"></div>
      </section>
    </Fragment>
  )
}

export default Summary
