import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Dots, Money } from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading, Puipui } from 'src/components/Misc/svg'

//constant

const TestPage = () => {
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = showSidebar

  return (
    <Fragment>
      <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        <div
          className={`${
            sideBarShowed ? 'ml-0 sm:ml-40' : 'ml-0'
          } transition-all duration-500 ease-in-out`}
        ></div>
        <ClockLoading className="h-10 w-10" />
        <TestComp />
        <C />
      </CommonLayout>

      {/*
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
        setCheckState((state) => {
          return {
            ...state,
            checked: !state.checked,
          }
        })
      }}
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
  return <span className="absolute h-10 w-10 bg-red-300 z-20"></span>
}
