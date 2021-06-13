import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Dots, Money } from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading, Puipui } from 'src/components/Misc/svg'
import { iconTypes, CREDIT_CARD } from 'src/components/DefaultType/Static'
import SummaryChart from 'src/components/Summary/SummaryChart'

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

        <Switcher />
        <div className="max-w-xl max-h-96 overflow-hidden relative border border-red-300">
          {/*
          <svg
            className="relative"
            viewBox="0 0 960 545"
            id="svgelem"
            // width="100%"
            // height="100%"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <path
              fill="rgb(35,42,58)"
              fillOpacity="1"
              d=" M0,0 C0,0 0,0 0,0 C0,0 151,0 151,0 C151,0 151,0 151,0 C151,0 151,928 151,928 C151,928 151,928 151,928 C151,928 22,928 22,928 C9.850000381469727,928 0,918.1500244140625 0,906 C0,906 0,0 0,0z"
            ></path>

            <path
              fill="gray"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M 36 24 c -4.971 0 -9 2.685 -9 6 s 4.029 6 9 6 s 9 2.685 9 6 s -4.029 6 -9 6 m 0 -24 c 3.33 0 6.24 1.206 7.797 3 M 36 24 V 21 m 0 3 v 24 m 0 0 v 3 m 0 -3 c -3.33 0 -6.24 -1.206 -7.797 -3 M 63 36 a 27 27 90 1 1 -54 0 a 27 27 90 0 1 54 0 z"
            />
            </svg>


          */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 752 342"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
          >
            <g>
              {/*
              <rect width="752" height="342" fill="#C4C4C4" />

                <circle cx="112" cy="60" r="26" fill="#F3F3F3"></circle>
                <circle cx="112" cy="120" r="26" fill="#F3F3F3" />
                <circle cx="112" cy="180" r="26" fill="#F3F3F3" />
              */}
              <g className="testingGroup transform transition-all duration-500 ease-in-out">
                <path
                  transform="translate(100,50)"
                  fill="white"
                  d="M5.003,22h4h6h4c1.103,0,2-0.897,2-2v-9c0-0.265-0.105-0.52-0.293-0.707l-8-8c-0.391-0.391-1.023-0.391-1.414,0l-8,8 C3.108,10.48,3.003,10.735,3.003,11v9C3.003,21.103,3.9,22,5.003,22z M10.003,20v-5h4v5H10.003z M5.003,11.414l7-7l7,7L19.004,20 h-3.001v-5c0-1.103-0.897-2-2-2h-4c-1.103,0-2,0.897-2,2v5h-3V11.414z"
                ></path>
              </g>
              <path
                transform="translate(100,110)"
                fill="white"
                d="M20,3H4C2.897,3,2,3.897,2,5v11c0,1.103,0.897,2,2,2h7v2H8v2h3h2h3v-2h-3v-2h7c1.103,0,2-0.897,2-2V5 C22,3.897,21.103,3,20,3z M4,14V5h16l0.002,9H4z"
              ></path>
              <path
                transform="translate(100,170)"
                fill="white"
                d="M17,2H7C5.897,2,5,2.897,5,4v16c0,1.103,0.897,2,2,2h10c1.103,0,2-0.897,2-2V4C19,2.897,18.103,2,17,2z M7,16.999V5h10 l0.002,11.999H7z"
              ></path>
            </g>
          </svg>
          {/*

          */}
        </div>
      </CommonLayout>

      {/*
          <Wrapper className="relative">
            <Money className="text-red-300 absolute top-0 left-0 h-4 w-4" />
            {React.createElement(Credit, {
              className:
                'relative h-12 w-12 bg-gray-400 rounded-full text-golden -z-1',
            })}
          </Wrapper>
          <C />
        <Puipui className="h-40 w-40 text-white border rounded-full bg-gray-300 footerGradient" />
        <Puipui className="h-40 w-40 text-white border rounded-full bg-gray-300 footerGradient" />
      */}
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
