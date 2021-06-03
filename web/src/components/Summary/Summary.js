import React, { Fragment } from 'react'
import * as _ from 'lodash'
import { Wrapper } from 'src/components/Misc/UtilityFunc'
import SingleType from 'src/components/DefaultType/SingleType'
import { iconTypes, isTypeExpense } from '../DefaultType/Static'
import { Money } from '../Misc/svg'

const Summary = ({
  textExpenseByType,
  typeCategoryState,
  setTypeCategoryState,
  ...rest
}) => {
  const { types } = typeCategoryState

  return (
    <Fragment>
      <div className="textInsightSection text-white w-full max-h-24 border border-red-300 mb-1">
        <h1>xx</h1>
        <h1>xx</h1>
        <h1>xx</h1>
        <h1>xx</h1>
      </div>
      <section className="numberInsightsection text-displayOnly flex">
        <div className="typeRank border border-yellow-300 max-h-96 flex-grow">
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
                      singleType?.description
                        ? iconTypes[singleType?.description]
                        : iconTypes['CREDIT_CARD']
                    }
                    newName={
                      singleType?.newName ? singleType?.newName : 'default'
                    }
                    parentClass="w-16 sm:w-20"
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
                  <div className="rank m-2 h-full w-80 border border-gray-500 ">
                    <div className="rankBarContent w-20 h-full"></div>
                  </div>
                </Wrapper>
                <Wrapper>
                  <div>{` $ ${oneType.sum.amount}`}</div>
                </Wrapper>
              </div>
            )
          })}
        </div>
        <div className="typeRank border border-blue-300 h-20 flex-grow">
          <Wrapper>
            <div className="rankBar m-2 h-full w-80 border border-green-500 "></div>
          </Wrapper>
        </div>
      </section>
    </Fragment>
  )
}

export default Summary
