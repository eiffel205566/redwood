import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Link, routes } from '@redwoodjs/router'
import {
  Dots,
  Money,
  Sunshine,
  Calender,
  Calculator,
  BarChart,
  PieChart,
  ChevronRight,
} from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading, Puipui, Sunshining } from 'src/components/Misc/svg'
import { iconTypes, CREDIT_CARD } from 'src/components/DefaultType/Static'
import { FrontPageAnimation } from 'src/components/Misc/svgExtra'
// import {xx} from '../../resource/monitor_pic.png'
import Monitor from '../TestPage/monitor_pic.png'
import MonitorLarge from '../TestPage/monitorLarge.png'

import { IoBarChartOutline } from 'react-icons/io5'
import { FcCalculator, FcBarChart, FcList, FcPieChart } from 'react-icons/fc'
import { Wrapper } from 'src/components/Misc/UtilityFunc'

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

  const [frontPageCarousel, setFrontPageCarousel] = useState({
    translateX: 0,
    animationX: true,
    loaded: false,
  })

  const carouselAnimation = () => {
    let timeId = setTimeout(function carouselDelayRun() {
      setFrontPageCarousel((state) => {
        return {
          ...state,
          translateX: state.translateX === 2 ? 0 : ++state.translateX,
        }
      })
      timeId = setTimeout(carouselDelayRun, 5000)
    }, 5000)
  }
  useEffect(() => {
    carouselAnimation()
  }, [])

  const container = document.getElementById('animationContainer')
  const reference = useRef(container)

  useEffect(() => {
    if (container) {
      // console.log(container)
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // console.log(entry, entry.isIntersecting)
          setFrontPageCarousel((state) => {
            return {
              ...state,
              animationX: !entry.isIntersecting,
            }
          })
        })
      })

      // console.log(reference.current)
      observer.observe(reference.current)
      return () => {
        if (reference.current) {
          observer.unobserve(reference.current)
        }
      }
    }
  }, [frontPageCarousel.loaded])

  return (
    <Fragment>
      {/*

      */}
      <CommonLayout
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        maxWidth="1"
      >
        <div className="carouselPictureContainer absolute top-0 left-0 -z-10 w-screen overflow-x-hidden select-none">
          {/*
            <div className="overlayBackground bg-gray-100 absolute min-h-full min-w-full bg-opacity-50 cursor-default z-10"></div>
           */}
          <ul
            className={` allTagss frontPageCarousel h-screen w-screen flex transform transition-all duration-1000 ease-in-out -translate-x-${frontPageCarousel.translateX}/3`}
          >
            <li className="flex flex-col pictureContainer_1 h-screen w-full "></li>
            <li className="flex flex-col pictureContainer_2 h-screen w-full "></li>
            <li className="flex flex-col pictureContainer_3 h-screen w-full "></li>
          </ul>
        </div>

        {/*
          <ClockLoading className="h-10 w-10" />
          <div className="max-w-xl max-h-96 overflow-hidden relative border border-red-300">
          <Sunshining />
          </div>


        */}
        <div className="placeholder relative h-screen w-screen">
          {/*
            <div className="w-2/3 md:w-1/3 h-1/2 text-white transform translate-all translate-x-1/4 translate-y-2/3">
              <h3 className="love text-2xl md:text-6xl italic">
                Personal Expense & Income Tacker
              </h3>
              <div className="loginButton bg-green-300 w-40">Start Tracking</div>
            </div>
            ---
          */}
          <div className="max-w-5xl mx-auto h-full flex flex-col justify-center select-none">
            <h3 className="love text-4xl sm:text-6xl md:text-8xl italic text-white transform -translate-y-1/2">
              Personal Expense & Income Tacker
            </h3>

            <div className="love cursor-pointer hover:text-black hover:bg-gray-100 text-white rounded-lg fontGrad italic loginButton border-2 border-green-300 h-10 w-40 text-4xl text-black text-center transform transition-all duration-500 ease-in-out">
              Start Here...
            </div>
          </div>

          {/*
           */}
        </div>
        <div
          className={`${
            sideBarShowed ? 'ml-0 sm:ml-40' : 'ml-0'
          } transition-all duration-500 ease-in-out`}
        ></div>

        {/*

          <Switcher setFrontPageCarousel={setFrontPageCarousel} />
        */}

        <div className="section_2 w-screen flex flex-col md:flex-row">
          <div
            onLoad={() => {
              setFrontPageCarousel((state) => {
                return {
                  ...state,
                  loaded: true,
                }
              })
            }}
            id="animationContainer"
            ref={reference}
            className={`animationContainer${
              frontPageCarousel.animationX ? '' : '_visible'
            } relative max-w-xl max-h-96 overflow-hidden relative flex-grow`}
          >
            <div className="h-full w-full absolute -z-10">
              <img className="h-full m-auto" src={MonitorLarge} alt="monitor" />
            </div>
            <FrontPageAnimation />
          </div>

          <div className="flex-grow">
            <div
              className={`textContainer${
                frontPageCarousel.animationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcCalculator className="h-full w-12" />
              <Wrapper>
                <span className="text-white">
                  How much did I spent on gummy bear?
                </span>
              </Wrapper>
            </div>

            <div
              className={`textContainer${
                frontPageCarousel.animationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcBarChart className="h-full w-12" />
              <Wrapper>
                <span className="text-white">
                  What is my interests income last week?
                </span>
              </Wrapper>
            </div>

            <div
              className={`textContainer${
                frontPageCarousel.animationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcList className="h-full w-12" />
              <Wrapper>
                <span className="text-white">
                  I want to know detail of my expanding?
                </span>
              </Wrapper>
            </div>

            <div
              className={`textContainer${
                frontPageCarousel.animationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcPieChart className="h-full w-12" />
              <Wrapper>
                <span className="text-white">
                  What type of expense counts for most?
                </span>
              </Wrapper>
            </div>
          </div>
        </div>
        {/*
            <div className="absolute h-10 w-10 top-0 right-10 bg-red-300"></div>
            <div className="textContainer absolute top-0 right-0 text-white">
              <h3>xxx</h3>
              <h3>xxx</h3>
              <h3>xxx</h3>
              <h3>xxx</h3>
            </div>

            <div className="placeholder h-screen w-screen"></div>
          */}
        <div className="h-screen text-white bg-displayOnly">xxx</div>
      </CommonLayout>
    </Fragment>
  )
}

export default TestPage

const Switcher = ({ setFrontPageCarousel }) => {
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
        setFrontPageCarousel((state) => {
          return {
            ...state,
            animationX: !state.animationX,
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

// export const Wrapper = ({ children, className, ...rest }) => {
//   const { onClick, paddingLeft } = rest || {}
//   return (
//     <div
//       onClick={onClick}
//       className={`${className} flex flex-col justify-center relative ${
//         paddingLeft ? 'paddingLeft' : 'pl-1'
//       } text-xs sm:text-sm md:text-base`}
//     >
//       {children}
//     </div>
//   )
// }
