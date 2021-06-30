import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Link, routes } from '@redwoodjs/router'

import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading, Puipui, Sunshining } from 'src/components/Misc/svg'
import { iconTypes, CREDIT_CARD } from 'src/components/DefaultType/Static'
import { FrontPageAnimation } from 'src/components/Misc/svgExtra'
// import {xx} from '../../resource/monitor_pic.png'
import Monitor from '../TestPage/monitor_pic.png'
import MonitorLarge from '../TestPage/monitorLarge.png'

import { AiOutlineDollarCircle } from 'react-icons/ai'
import {
  FcCalculator,
  FcBarChart,
  FcList,
  FcPieChart,
  FcShop,
  FcBriefcase,
  FcCurrencyExchange,
  FcBullish,
  FcCustomerSupport,
} from 'react-icons/fc'
import { generateRandomColors, Wrapper } from 'src/components/Misc/UtilityFunc'
import SingleExpense from 'src/components/Expenses/SingleExpense'
import SingleType from 'src/components/DefaultType/SingleType'
import { Doughnut } from 'react-chartjs-2'

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
    textAnimationX: true,
    loaded: false,
  })

  // const carouselAnimation = () => {
  //   let timeId = setTimeout(function carouselDelayRun() {
  //     setFrontPageCarousel((state) => {
  //       return {
  //         ...state,
  //         translateX: state.translateX === 2 ? 0 : ++state.translateX,
  //       }
  //     })
  //     timeId = setTimeout(carouselDelayRun, 5000)
  //   }, 5000)
  // }
  // useEffect(() => {
  //   carouselAnimation()
  // }, [])

  //! handling viewport visibility check with  IntersectionObserver

  const animationContainer = document.getElementById('animationContainer')
  const animationReference = useRef(animationContainer)
  const textContainer = document.getElementById('textContainer')
  const textReference = useRef(textContainer)

  useEffect(() => {
    if (animationContainer) {
      // console.log(animationContainer)
      const observerAnimation = new IntersectionObserver((entries) => {
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

      const observerText = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          // console.log(entry, entry.isIntersecting)
          setFrontPageCarousel((state) => {
            return {
              ...state,
              textAnimationX: !entry.isIntersecting,
            }
          })
        })
      })

      // console.log(animationReference.current)
      observerAnimation.observe(animationReference.current)
      observerText.observe(textReference.current)

      return () => {
        if (animationReference.current) {
          observerAnimation.unobserve(animationReference.current)
        }

        if (textReference.current) {
          observerText.unobserve(textReference.current)
        }
      }
    }
  }, [frontPageCarousel.loaded])

  //! --

  // ! local page tag state
  const [tagState, setTagState] = useState({
    Juice: true,
    Coke: true,
    Business: true,
    Project: true,
    'Bank Fee': true,
    Dividend: true,
    'Day Job': true,
  })

  // ! --

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
            className={`allTagss frontPageCarousel h-screen w-screen flex transform transition-all duration-500 ease-in-out -translate-x-${frontPageCarousel.translateX}/3`}
          >
            <li className="flex flex-col pictureContainer_1 h-screen w-full "></li>
            <li className="flex flex-col pictureContainer_2 h-screen w-full "></li>
            <li className="flex flex-col pictureContainer_3 h-screen w-full "></li>
          </ul>
        </div>

        {/*


        */}
        <div className="placeholder relative h-screen w-screen">
          {/*

          */}
          <div className="max-w-5xl mx-auto h-full flex flex-col justify-center select-none">
            <h3 className="love text-5xl sm:text-6xl md:text-8xl italic text-white transform -translate-y-1/2">
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

        */}

        <div className="section_2 max-w-5xl mx-auto flex flex-col md:flex-row">
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
            ref={animationReference}
            className={`animationContainer${
              frontPageCarousel.animationX ? '' : '_visible'
            } relative max-w-xl max-h-96 overflow-hidden relative flex-grow`}
          >
            <div className="h-full w-full absolute -z-10">
              <img className="h-full m-auto" src={MonitorLarge} alt="monitor" />
            </div>
            <FrontPageAnimation />
          </div>

          <div id="textContainer" ref={textReference} className="flex-grow">
            <div
              className={`textContainer${
                frontPageCarousel.textAnimationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcCalculator className="h-full w-12" />
              <Wrapper>
                <span className="text-white md:text-xl">
                  How much did I spent on gummy bear?
                </span>
              </Wrapper>
            </div>

            <div
              className={`textContainer${
                frontPageCarousel.textAnimationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcBarChart className="h-full w-12" />
              <Wrapper>
                <span className="text-white md:text-xl">
                  What is my interests income last week?
                </span>
              </Wrapper>
            </div>

            <div
              className={`textContainer${
                frontPageCarousel.textAnimationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcList className="h-full w-12" />
              <Wrapper>
                <span className="text-white md:text-xl">
                  I want to know detail of my expanding?
                </span>
              </Wrapper>
            </div>

            <div
              className={`textContainer${
                frontPageCarousel.textAnimationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcPieChart className="h-full w-12" />
              <Wrapper>
                <span className="text-white md:text-xl">
                  What type of expense counts for most?
                </span>
              </Wrapper>
            </div>
          </div>
        </div>
        {/*

          */}
        <div className="section_3 max-w-5xl mx-auto flex flex-col md:flex-row select-none">
          <div className="demoExpenses mx-auto w-3/4 sm:w-96 flex flex-col ">
            <div className="singleExpense flex h-12 bg-sideDark text-white my-1">
              <FcShop className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-yellow-300" />
              </Wrapper>

              <Wrapper>
                <span className="text-white w-8 sm:w-10">$120</span>
              </Wrapper>

              <LandingPageTag
                content="Juice"
                tagState={tagState}
                setTagState={setTagState}
              />
              <LandingPageTag
                content="Coke"
                tagState={tagState}
                setTagState={setTagState}
              />
            </div>
            <div className="singleExpense flex h-12 bg-sideDark text-white my-1">
              <FcBriefcase className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-red-300" />
              </Wrapper>
              <Wrapper>
                <span className="text-white w-8 sm:w-10">$20</span>
              </Wrapper>

              <LandingPageTag
                content="Business"
                tagState={tagState}
                setTagState={setTagState}
              />
              <LandingPageTag
                content="Project"
                tagState={tagState}
                setTagState={setTagState}
              />
            </div>
            <div className="singleExpense flex h-12 bg-sideDark text-white my-1">
              <FcCurrencyExchange className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-yellow-300" />
              </Wrapper>
              <Wrapper>
                <span className="text-white w-8 sm:w-10">$15</span>
              </Wrapper>
              <LandingPageTag
                content="Bank Fee"
                tagState={tagState}
                setTagState={setTagState}
              />
            </div>
            <div className="singleExpense flex h-12 bg-sideDark text-white my-1">
              <FcBullish className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-red-300" />
              </Wrapper>
              <Wrapper>
                <span className="text-white w-8 sm:w-10">$150</span>
              </Wrapper>
              <LandingPageTag
                content="Dividend"
                tagState={tagState}
                setTagState={setTagState}
              />
            </div>
            <div className="singleExpense flex h-12 bg-sideDark text-white my-1">
              <FcCustomerSupport className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-red-300" />
              </Wrapper>
              <Wrapper>
                <span className="text-white w-8 sm:w-10">$23</span>
              </Wrapper>
              <LandingPageTag
                content="Day Job"
                tagState={tagState}
                setTagState={setTagState}
              />
            </div>
          </div>

          <div className="demoChart w-3/4 sm:w-96 h-72 mx-auto">
            <LandingPageChart tagState={tagState} />
          </div>
          {/*

          */}
        </div>

        <div className="h-96"></div>
      </CommonLayout>
    </Fragment>
  )
}

export default TestPage

const LandingPageTag = ({ content, tagState, setTagState }) => {
  return (
    <div
      onClick={() => {
        setTagState((state) => {
          return {
            ...state,
            [content]: !state[content],
          }
        })
      }}
      className="flex flex-col justify-center text-xs sm:text-sm md:text-base pl-1 text-center w-16 sm:w-32 h-12 select-none"
      onKeyDown={() => {}}
      role="button"
      tabIndex="0"
    >
      <span
        className={`whitespace-nowrap rounded-full py-1 px-2 ${
          tagState[content]
            ? 'bg-green-300 text-black hover:bg-green-400'
            : 'bg-overlay text-white hover:bg-gray-500'
        }`}
      >
        {content}
      </span>
    </div>
  )
}

const LandingPageChart = ({ ...props }) => {
  const { tagState } = props
  let Grocery = 60
  let Business = 20
  let Fee = 15
  let Investment = 75
  let Work = 23

  if (!tagState['Juice']) {
    Grocery = Grocery - 20
  }

  if (!tagState['Coke']) {
    Grocery = Grocery - 15
  }

  if (!tagState['Business']) {
    Business = Business - 5
  }

  if (!tagState['Project']) {
    Business = Business - 7
  }

  if (!tagState['Bank Fee']) {
    Fee = Fee - 7
  }

  if (!tagState['Dividend']) {
    Investment = Investment - 28
  }

  if (!tagState['Day Job']) {
    Work = Work - 23
  }

  const data = {
    labels: ['Grocery', 'Business', 'Fee', 'Investment', 'Work'],
    datasets: [
      {
        data: [Grocery, Business, Fee, Investment, Work],
        fill: true,
        backgroundColor: [...generateRandomColors(5)],
        borderColor: '#C0C0C0',
      },
    ],
  }

  const options = {
    maintainAspectRatio: false,
    legend: {
      labels: {
        fontColor: '#909090',
      },
    },
  }

  return (
    <Fragment>
      <Doughnut data={data} options={options} />
    </Fragment>
  )
}
