import React, { Fragment, useState } from 'react'
import SingleType from 'src/components/DefaultType/SingleType'
import { Edit, Plus, Check } from 'src/components/Misc/svg'
import { Form, TextField, Submit, Label } from '@redwoodjs/forms'
import { truncate } from '../Misc/UtilityFunc'

const SingleExpense = ({
  singleExpense,
  iconTypes,
  tagEditState,
  setTagEditState,
}) => {
  const { id, amount, type } = singleExpense
  const onHandleAddTagClick = (e) => {
    e.preventDefault()
    setTagEditState((state) => {
      return {
        ...state,
        id,
        editState: true,
      }
    })
  }

  return (
    <div className="singleExpense flex w-full h-12 bg-sideDark text-white my-1">
      <div className="flexWrapperNoTime flex flex-grow">
        <Wrapper className="hover:text-gray-300 cursor-pointer">
          <Edit className="h-6 w-6" />
        </Wrapper>

        <Wrapper>
          <span>$15.12</span>
        </Wrapper>

        <Wrapper>
          <SingleType
            icon={iconTypes['CREDIT_CARD']}
            newName={'default'}
            parentClass="w-max"
            iconClass="mx-auto h-6 w-6 text-displayOnly"
            noHoverNeeded={true}
            textColor="text-displayOnly"
          />
        </Wrapper>

        <Wrapper>
          <span>{'Tags: '}</span>
        </Wrapper>

        <Wrapper
          onClick={onHandleAddTagClick}
          className="hover:text-gray-300 cursor-pointer"
        >
          <Plus className="h-5 w-5 md:h-6 md:w-6" />
        </Wrapper>
        {id === tagEditState.id ? (
          <Wrapper className="hover:text-green-300 cursor-pointer">
            <Check className="h-5 w-5 md:h-6 md:w-6" />
          </Wrapper>
        ) : null}
        {id === tagEditState.id ? (
          <Tag setTagEditState={setTagEditState} />
        ) : null}

        <div className="carousel h-full bg-gray-600 overflow-hidden">
          <ul className="allTags pl-1 text-xs sm:text-sm md:text-base h-full bg-gray-600">
            <li className="inline-block h-full">
              <Tag content={'mess around'} />
            </li>
            <li className="inline-block h-full">
              <Tag content={'Fun'} />
            </li>
            <li className="inline-block h-full">
              <Tag content={'hang out'} />
            </li>
            <li className="inline-block h-full">
              <Tag content={'hang out'} />
            </li>
          </ul>
        </div>
        {/*
            <Tag content={'hang out'} />
            <Tag content={'Fun'} />
          <Tag content={'cuddle'} />
          <Tag content={'streaming'} />
         */}
      </div>

      {timeTag(new Date())}
    </div>
  )
}

//utility
const timeTag = (datetime) => {
  return (
    <Fragment>
      <div className="text-xs sm:text-sm md:text-base flex flex-col justify-center text-displayOnly px-0.5 sm:px-1 md:px-2">
        <time dateTime={datetime} title={datetime}>
          {new Date(datetime).toDateString().split(' ').slice(1).join(' ')}
        </time>
      </div>
    </Fragment>
  )
}

//utility
const Tag = ({ content, setTagEditState = () => {} }) => {
  return (
    <div
      className={`${
        content ? '' : 'text-displayOnly'
      } flex flex-col justify-center text-xs sm:text-sm md:text-base pl-1 text-center w-32 h-full`}
    >
      <span className="rounded-full py-1 px-2 bg-overlay">
        {content ? (
          truncate(content, 8)
        ) : (
          <input
            onBlur={() => {
              setTagEditState((state) => {
                return {
                  ...state,
                  id: null,
                  editState: false,
                }
              })
            }}
            className="bg-overlay border focus:border-green-300 w-full"
          ></input>
        )}
      </span>
    </div>
  )
}

//utility
const Wrapper = ({ children, className, ...rest }) => {
  const { onClick } = rest || {}
  return (
    <div
      onClick={onClick}
      className={`${className} flex flex-col justify-center pl-1 text-xs sm:text-sm md:text-base`}
    >
      {children}
    </div>
  )
}

export default SingleExpense
