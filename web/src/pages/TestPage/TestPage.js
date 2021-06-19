import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Dots, Money, Sunshine } from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading, Puipui, Sunshining } from 'src/components/Misc/svg'
import { iconTypes, CREDIT_CARD } from 'src/components/DefaultType/Static'
import svgExtra from 'src/components/Misc/svgExtra'

//constant

const TestPage = () => {
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = showSidebar

  const Credit = iconTypes[CREDIT_CARD]

  let throttleTimeout = useRef(null)

  const onHandleScroll = (e) => {
    const callback = () => {
      setTimeout(
        () =>
          console.log(
            // `scrollHeight: ${e.target.scrollHeight} scrollTop: ${Math.abs(
            //   e.target.scrollTop
            // )} clientHeight: ${e.target.clientHeight}`
            e.target.scrollHeight - Math.abs(e.target.scrollTop) ===
              e.target.clientHeight
          ),
        500
      )
    }
    if (!throttleTimeout.current) {
      callback()
      throttleTimeout.current = setTimeout(() => {
        throttleTimeout.current = null
      }, 500)
    }
  }
  return (
    <Fragment>
      <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        <div
          className={`${
            sideBarShowed ? 'ml-0 sm:ml-40' : 'ml-0'
          } transition-all duration-500 ease-in-out`}
        ></div>
        <ClockLoading className="h-10 w-10" />

        <Switcher />
        <div className="max-w-xl max-h-96 overflow-hidden relative border border-red-300">
          <Sunshining />
          {/*

            */}
        </div>

        <div
          onScroll={onHandleScroll}
          id="pageTest"
          className="paginationTesting h-48 w-48 border border-white overflow-y-scroll overflow-x-hidden"
        >
          <div className="h-10 w-full bg-gray-300 border border-red-500">1</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">2</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">3</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">4</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">5</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">6</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">1</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">2</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">3</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">4</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">5</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">6</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">1</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">2</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">3</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">4</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">5</div>
          <div className="h-10 w-full bg-gray-300 border border-red-500">6</div>
        </div>
      </CommonLayout>
    </Fragment>
  )
}

export default TestPage

const Switcher = () => {
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
        checked ? 'red' : 'golden'
      }${checked ? '-500' : ''} cursor-pointer`}
    >
      {/*
       */}
      <Money
        className={`translate-x-${
          checked ? '7' : '0'
        } text-gray-700 transform transition-all duration-500 ease-in-out absolute border-transparent rounded-full -inset-0 slider bg-transparent h-5 w-5 `}
      ></Money>
    </div>
  )
}

const C = () => {
  return <span className="absolute h-10 w-10 bg-red-300"></span>
}

export const Wrapper = ({ children, className, ...rest }) => {
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
