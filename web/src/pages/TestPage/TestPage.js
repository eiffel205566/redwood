import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Dots, Money } from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading, Puipui } from 'src/components/Misc/svg'
import { iconTypes, CREDIT_CARD } from 'src/components/DefaultType/Static'

//constant

const TestPage = () => {
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = showSidebar

  const Credit = iconTypes[CREDIT_CARD]

  return (
    <Fragment>
      <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        <div
          className={`${
            sideBarShowed ? 'ml-0 sm:ml-40' : 'ml-0'
          } transition-all duration-500 ease-in-out`}
        ></div>
        <ClockLoading className="h-10 w-10" />

        <Wrapper className="relative">
          <Money className="text-yellow-300 absolute top-0 left-0 h-4 w-4" />
          {React.createElement(Credit, {
            className:
              'relative h-12 w-12 bg-gray-400 rounded-full text-green-700 -z-1',
          })}
        </Wrapper>
      </CommonLayout>

      {/*
          <C />
          <TestComp />
        <Puipui className="h-40 w-40 text-white border rounded-full bg-gray-300 footerGradient" />
        <Puipui className="h-40 w-40 text-white border rounded-full bg-gray-300 footerGradient" />
      */}
    </Fragment>
  )
}

export default TestPage

const TestComp = () => {
  const [checkState, setCheckState] = useState({
    checked: false,
  })
  const { checked } = checkState
  return (
    <div
      onClick={() => {
        console.log('click')
        setCheckState((state) => {
          return {
            ...state,
            checked: !state.checked,
          }
        })
      }}
      onKeyDown={(e) => console.log(e.key)}
      tabIndex="0"
      role="button"
      className={`transform transition-all duration-500 ease-in-out parent relative h-5 w-12 rounded-full bg-${
        checked ? 'green' : 'yellow'
      }-${checked ? '500' : '500'} cursor-pointer`}
    >
      <span
        className={`translate-x-${
          checked ? '7' : '0'
        } transform transition-all duration-500 ease-in-out absolute border-transparent rounded-full -inset-0 slider bg-gray-500 h-5 w-5 `}
      ></span>
    </div>
  )
}

const C = () => {
  return <span className="absolute h-10 w-10 bg-red-300"></span>
}

const Wrapper = ({ children, className, ...rest }) => {
  const { onClick, paddingLeft } = rest || {}
  return (
    <div
      onClick={onClick}
      className={`${className} flex flex-col justify-center relative ${
        paddingLeft ? 'paddingLeft' : 'pl-1'
      } text-xs sm:text-sm md:text-base`}
    >
      {children}
    </div>
  )
}
