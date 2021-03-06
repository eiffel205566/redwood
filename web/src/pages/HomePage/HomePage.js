import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment, useRef } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { useAuth } from '@redwoodjs/auth'
import Letter from './Letter'
import Footer from 'src/layouts/CommonLayout/Footer'
import { LandingPageTag } from 'src/components/Misc/UtilityFunc'

import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { FrontPageAnimation } from 'src/components/Misc/svgExtra'
import MonitorLarge from '../TestPage/monitorLarge.png'

import { AiOutlineDollarCircle } from 'react-icons/ai'
import { FiArrowUpCircle } from 'react-icons/fi'
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
import { AiOutlineRight, AiOutlinePause } from 'react-icons/ai'
import { generateRandomColors, Wrapper } from 'src/components/Misc/UtilityFunc'
import { Doughnut } from 'react-chartjs-2'

//! constant
const FIRSTLINE = 'TRACK EXPENSE'
const SECONDLINE = 'RECORD INCOME'
//!--

const LandingPage = () => {
  //! Login Logout
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  //!--
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = showSidebar

  const [frontPageCarousel, setFrontPageCarousel] = useState({
    stopAnimation: false,
    timeId: null,
    translateX: 0,
    animationX: true,
    textAnimationX: true,
    expenseX: true,
    chartX: true,
    bigTextFirstX: false,
    bigTextSecondX: false,
    loaded: false,
    sectionFourChart: false,
  })

  //! landingPage Picture Carousel animation
  const carouselAnimation = () => {
    let localState
    frontPageCarousel.timeId = setTimeout(function carouselDelayRun() {
      setFrontPageCarousel((state) => {
        localState =
          state.translateX === 4 ? { ...state, translateX: 0 } : state
        return {
          ...state,
          translateX: state.translateX === 4 ? 0 : ++state.translateX,
        }
      })

      if (localState.stopAnimation) {
        clearTimeout(localState.timeId)
        return
      }

      if (localState.translateX === 0) {
        clearTimeout(frontPageCarousel.timeId)
        frontPageCarousel.timeId = setTimeout(carouselDelayRun, 200)
      } else {
        frontPageCarousel.timeId = setTimeout(carouselDelayRun, 2000)
      }
    }, 2000)
  }
  useEffect(() => {
    if (!frontPageCarousel.stopAnimation) {
      carouselAnimation()
    }

    return () => {
      clearTimeout(frontPageCarousel.timeId)
    }
  }, [frontPageCarousel.stopAnimation])

  //! handling viewport visibility check with  IntersectionObserver

  const animationContainer = document.getElementById('animationContainer')
  const animationReference = useRef(animationContainer)
  const textContainer = document.getElementById('textContainer')
  const textReference = useRef(textContainer)
  const expenseContainer = document.getElementById('expenseContainer')
  const expenseReference = useRef(expenseContainer)
  const chartContainer = document.getElementById('chartContainer')
  const chartReference = useRef(chartContainer)
  const bigTextFirstLine = document.getElementById('bigTextFirstLine')
  const bigTextFirstLineRef = useRef(bigTextFirstLine)
  const bigTextSecondLine = document.getElementById('bigTextSecondLine')
  const bigTextSecondLineRef = useRef(bigTextSecondLine)
  const sectionFour = document.getElementById('section_4')
  const sectionFourRef = useRef(sectionFour)

  const option = { threshold: 0.3 }

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
      }, option)

      const observerText = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setFrontPageCarousel((state) => {
            return {
              ...state,
              textAnimationX: !entry.isIntersecting,
            }
          })
        })
      }, option)

      const observerExpense = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setFrontPageCarousel((state) => {
            return {
              ...state,
              expenseX: !entry.isIntersecting,
            }
          })
        })
      }, option)

      const observerChart = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setFrontPageCarousel((state) => {
            return {
              ...state,
              chartX: !entry.isIntersecting,
            }
          })
        })
      }, option)

      const observerBigTextFirstLine = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setFrontPageCarousel((state) => {
            return {
              ...state,
              bigTextFirstX: entry.isIntersecting,
            }
          })
        })
      })

      const observerBigTextSecondLine = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setFrontPageCarousel((state) => {
            return {
              ...state,
              bigTextSecondX: entry.isIntersecting,
            }
          })
        })
      })

      const observerSectionFour = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setFrontPageCarousel((state) => {
              return {
                ...state,
                sectionFourChart: entry.isIntersecting,
              }
            })
          })
        },
        { threshold: 0.4 }
      )

      // console.log(animationReference.current)
      observerAnimation.observe(animationReference.current)
      observerText.observe(textReference.current)
      observerExpense.observe(expenseReference.current)
      observerChart.observe(chartReference.current)
      observerBigTextFirstLine.observe(bigTextFirstLineRef.current)
      observerBigTextSecondLine.observe(bigTextSecondLineRef.current)
      observerSectionFour.observe(sectionFourRef.current)

      return () => {
        if (animationReference.current) {
          observerAnimation.unobserve(animationReference.current)
        }

        if (textReference.current) {
          observerText.unobserve(textReference.current)
        }

        if (expenseReference.current) {
          observerExpense.unobserve(expenseReference.current)
        }

        if (chartReference.current) {
          observerExpense.unobserve(chartReference.current)
        }

        if (bigTextFirstLineRef.current) {
          observerBigTextFirstLine.unobserve(bigTextFirstLineRef.current)
        }
        if (bigTextSecondLineRef.current) {
          observerBigTextSecondLine.unobserve(bigTextSecondLineRef.current)
        }
        if (sectionFourRef.current) {
          observerSectionFour.unobserve(sectionFourRef.current)
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
        isLandingPage={true}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        maxWidth="1"
        logIn={logIn}
        logOut={logOut}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
      >
        <div className="scrollUpContainer z-50 fixed w-screen h-8 bottom-10 overflow-x-hidden flex justify-center">
          <div className="max-w-5xl h-8 fixed z-50 bottom-10 overflow-x-hidden flex">
            <div className="w-screen h-full z-50">
              {/*eslint-disable*/}
              {(!frontPageCarousel.animationX || !frontPageCarousel.textAnimationX || !frontPageCarousel.expenseX || !frontPageCarousel.chartX || frontPageCarousel.bigTextFirstX || frontPageCarousel.bigTextSecondX) &&
                <div onClick={()=> {
                  window.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  })
                }} className="cursor-pointer h-8 w-8 text-white hover:text-green-300 z-50 absolute right-0 mr-8">
                  <FiArrowUpCircle className="h-full w-full z-50" />
                </div>
              }
              {/*eslint-enable*/}
            </div>
          </div>
        </div>
        {/*
          <div className="scrollUpContainer fixed max-w-5xl h-8 z-50 border border-yellow-300 bottom-10 overflow-x-hidden">
            <div className="w-screen h-full"></div>
          </div>

      */}
        <div className="section_1 carouselPictureContainer absolute top-0 left-0 -z-10 w-screen overflow-x-hidden select-none">
          {/*
            >
           */}
          <ul
            className={`allTagss frontPageCarousel h-screen w-screen flex ${
              frontPageCarousel.translateX === 0
                ? ''
                : 'transform transition-all duration-500 ease-in-out'
            } -translate-x-${frontPageCarousel.translateX}/5`}
          >
            <li
              className={`flex flex-col pictureContainer_1${
                [0, 1].includes(frontPageCarousel.translateX) ? '' : ''
              } h-screen w-full `}
            ></li>
            <li
              className={`flex flex-col pictureContainer_2${
                [1, 2].includes(frontPageCarousel.translateX) ? '' : ''
              } h-screen w-full `}
            ></li>
            <li
              className={`flex flex-col pictureContainer_3${
                [2, 3].includes(frontPageCarousel.translateX) ? '' : ''
              } h-screen w-full `}
            ></li>
            <li
              className={`flex flex-col pictureContainer_4${
                [3, 4].includes(frontPageCarousel.translateX) ? '' : ''
              } h-screen w-full `}
            ></li>
            <li
              className={`flex flex-col pictureContainer_1${
                [0, 4].includes(frontPageCarousel.translateX) ? '' : ''
              } h-screen w-full `}
            ></li>
            {/*
             */}
          </ul>
        </div>

        {/*

        */}
        <div className="placeholder relative h-screen w-screen">
          {/*

          */}
          <div className="max-w-5xl mx-auto h-full flex flex-col justify-center select-none">
            <h3 className="love text-5xl sm:text-6xl md:text-8xl italic text-gray-100 font-semibold transform -translate-y-1/2">
              Personal Expense & Income Tacker
            </h3>

            <div className="buttonsContainer w-full flex">
              {/*eslint-disable*/}
              <div className="h-full flex flex-col justify-center">

              <div
                onClick={() => {
                  logIn()
                }}
                onKeyDown={() => {}}
                // tabIndex="0"
                // role="button"
                className="love border whitespace-nowrap cursor-pointer hover:text-black font-semibold text-white rounded-lg fontGrad italic loginButton w-40  text-2xl sm:text-4xl text-black text-center transform transition-all duration-500 ease-in-out"
              >
                Starts Here...
              </div>
              </div>
              <div
                onClick={() => {
                  setFrontPageCarousel((state) => {
                    return {
                      ...state,
                      stopAnimation: !state.stopAnimation,
                    }
                  })
                }}
                onKeyDown={() => {}}
                // role="button"
                // tabIndex="0"
                className="ml-1 relative w-10 h-full flex flex-col justify-center text-white hover:text-green-300 cursor-pointer"
              >
                {frontPageCarousel.stopAnimation ? (
                  <AiOutlineRight className="w-full h-full" />
                ) : (
                  <AiOutlinePause className="w-full h-full" />
                )}
              </div>
            {/*eslint-enable*/}
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
            <FrontPageAnimation visible={!frontPageCarousel.animationX} />
            {frontPageCarousel.animationX && (
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 752 342"
                fill="none"
                className="placeholder"
                preserveAspectRatio="xMidYMid meet"
              ></svg>
            )}
          </div>

          <div
            id="textContainer"
            ref={textReference}
            className="flex-grow select-none"
          >
            <div
              className={`textContainer${
                frontPageCarousel.textAnimationX ? '' : '_visible'
              } h-12 flex transform translate-all justify-center`}
            >
              <FcCalculator className="h-full w-12" />
              <Wrapper className="cursor-default">
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
              <Wrapper className="cursor-default">
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
              <Wrapper className="cursor-default">
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
              <Wrapper className="cursor-default">
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
          <div
            id="expenseContainer"
            ref={expenseReference}
            className="demoExpenses mx-auto w-3/4 sm:w-96 flex flex-col "
          >
            <div
              className={`singleExpense expenseContainer${
                frontPageCarousel.expenseX ? '' : '_visible'
              } flex h-12 bg-sideDark text-white my-1`}
            >
              <FcShop className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-yellow-300" />
              </Wrapper>

              <Wrapper>
                <span className="text-white w-8 sm:w-10">$38</span>
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
            <div
              className={`singleExpense expenseContainer${
                frontPageCarousel.expenseX ? '' : '_visible'
              } flex h-12 bg-sideDark text-white my-1`}
            >
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
            <div
              className={`singleExpense expenseContainer${
                frontPageCarousel.expenseX ? '' : '_visible'
              } flex h-12 bg-sideDark text-white my-1`}
            >
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
            <div
              className={`singleExpense expenseContainer${
                frontPageCarousel.expenseX ? '' : '_visible'
              } flex h-12 bg-sideDark text-white my-1`}
            >
              <FcBullish className="h-full w-10" />
              <Wrapper className="cursor-default">
                <AiOutlineDollarCircle className="h-1/2 w-6 text-red-300" />
              </Wrapper>
              <Wrapper>
                <span className="text-white w-8 sm:w-10">$40</span>
              </Wrapper>
              <LandingPageTag
                content="Dividend"
                tagState={tagState}
                setTagState={setTagState}
              />
            </div>
            <div
              className={`singleExpense expenseContainer${
                frontPageCarousel.expenseX ? '' : '_visible'
              } flex h-12 bg-sideDark text-white my-1`}
            >
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

          <div
            id="chartContainer"
            ref={chartReference}
            className={`demoChart chartContainer${
              frontPageCarousel.chartX ? '' : '_visible'
            } w-3/4 sm:w-96 h-72 mx-auto`}
          >
            <LandingPageChart tagState={tagState} />
          </div>
          {/*

          */}
        </div>
        <div className="separator h-6"></div>

        <div
          id="section_4"
          ref={sectionFourRef}
          className="section_4 mx-auto relative w-screen h-screen overflow-hidden"
        >
          {/*

          */}
          <div
            className={`pictureContainer_5 ${
              frontPageCarousel.sectionFourChart
                ? ''
                : 'pictureContainer_5_not_visible'
            } absolute w-full h-full z-30 transform transition-all duration-500 ease-in-out`}
          ></div>
          <div
            className={`pictureContainer_6 ${
              frontPageCarousel.sectionFourChart
                ? ''
                : 'pictureContainer_6_not_visible'
            } absolute w-full h-full z-20 transform transition-all duration-500 ease-in-out`}
          ></div>
          <div className="bigTextContainer w-full h-full bg-overlay absolute text-white">
            <div className="max-w-5xl mx-auto flex flex-col h-full select-none">
              <div className="h-full flex flex-col justify-center">
                <h1
                  id="bigTextFirstLine"
                  ref={bigTextFirstLineRef}
                  className="bigTextFirstLine text-4xl md:text-7xl text-center z-30 font-semibold"
                >
                  {frontPageCarousel.bigTextFirstX &&
                    Array.from(FIRSTLINE).map((letter, index, arr) => (
                      <Letter
                        key={index}
                        index={index}
                        letter={letter}
                        len={arr.length}
                      />
                    ))}
                </h1>
                <h1
                  id="bigTextSecondLine"
                  ref={bigTextSecondLineRef}
                  className="bigTextSecondLine text-4xl md:text-7xl text-center z-30 font-semibold"
                >
                  {frontPageCarousel.bigTextSecondX &&
                    Array.from(SECONDLINE).map((letter, index, arr) => (
                      <Letter
                        key={index}
                        index={index}
                        letter={letter}
                        len={arr.length}
                      />
                    ))}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="h-12"></div>
      </CommonLayout>
    </Fragment>
  )
}

export default LandingPage

const LandingPageChart = ({ ...props }) => {
  const { tagState } = props
  let Grocery = 38
  let Business = 20
  let Fee = 15
  let Investment = 40
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
