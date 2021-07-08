import { Fragment } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Dots, Money } from '../../components/Misc/svg'
import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'
import Footer from 'src/layouts/CommonLayout/Footer'

const CommonLayout = ({
  children,
  showSidebar,
  setShowSidebar,
  logIn = () => {},
  logOut = () => {},
  isAuthenticated = false,
  currentUser = { email: 'fakeuser2.expinsight@gmail.com' },
  ...rest
}) => {
  const { sideBarShowed } = showSidebar

  const { maxWidth } = rest || {}

  const onHandleSideBar = () => {
    setShowSidebar((state) => {
      return {
        ...state,
        sideBarShowed: !sideBarShowed,
      }
    })
  }
  //* calculating Morning or Afternoon
  const now = new Date()
  const secondsTillTomorrow =
    new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1) - now
  const greetings =
    secondsTillTomorrow < 86400000 / 4
      ? 'Evening'
      : secondsTillTomorrow < 86400000 / 2
      ? 'Afternoon'
      : secondsTillTomorrow < (86400000 * 3) / 4
      ? 'Morning'
      : 'Evening'

  //* --

  //-- for summary page
  const { typeCategoryState, isLandingPage } = rest || {}

  //-- burger
  const [burgerState, setBurgerState] = useState(false)

  return (
    <Fragment>
      {/*
        <div className="masterLoadingOverlay select-none background bg-transparent absolute min-h-full min-w-full z-50"></div>
       */}

      <div className="cover h-screen w-screen fixed bg-overlay -z-10 overflow-hidden"></div>

      {/*
        <aside
          className={`sidebarContainer transform ${
            sideBarShowed ? 'left-0' : '-left-40'
          } transition-all duration-500 ease-in-out min-h-screen fixed w-40 bg-sideDark`}
        >
          <SideBar className="w-40" />
          </aside>
          {false && (
            <div
              className="cursor-pointer bg-gray-400 w-10 flex flex-row justify-center z-10 headerGradient"
              onClick={onHandleSideBar}
              role="button"
              onKeyDown={() => {}}
              tabIndex="0"
            >
              <Dots
                className={
                  sideBarShowed
                    ? 'h-full w-6 transition duration-500 ease-in-out transform hover:text-gray-900'
                    : 'h-full w-6 transition duration-500 ease-in-out transform rotate-90 hover:text-gray-900'
                }
              />
            </div>
          )}
      */}

      <header className="h-14 z-30 headerGradient text-gray-300 select-none w-screen">
        {/*

        */}
        <div className="h-full max-w-5xl mx-auto z-30">
          <div className="z-30 bg-gray-400">
            <nav className="h-14 min-w-full flex flex-row z-20">
              <div className="pl-2 sm:pl-0 text-center flex-grow flex-col flex justify-center z-10 bg-gray-400 headerGradient">
                <h1 className="text-xl md:text-3xl font-semibold tracking-tight flex flex-row">
                  <span className="love">{'Exp '}</span>
                  <span> </span>
                  <span className="love">In</span>
                  {/*
                   */}
                  <span
                    id="money"
                    className="flex flex-col flex justify-center"
                  >
                    <Money className="h-6 w-6 animate-bounce" />
                  </span>
                  <span className="love">ight</span>
                </h1>
              </div>
              {/*
                <section className="profilePic h-full w-14 headerGradient">
                  <div className="h-full flex flex-col justify-center">
                    <div className="border bg-green-300 rounded-full w-10 h-10 m-auto text-center text-black">
                      <span className="wrapper h-full flex flex-col justify-center">
                        <span>FA</span>
                      </span>
                    </div>
                  </div>
                </section>
              */}
              {isAuthenticated && (
                <section className="welcomeMessage h-full headerGradient flex flex-col justify-center text-sm">
                  <span>{`Good ${greetings}!`} </span>
                </section>
              )}
              <div className="navButtons border-none focus:border-none flex flex-row justify-center headerGradient relative w-24">
                {/* logged-in status indicator */}
                {isAuthenticated && (
                  <div className="logStatusIndicator absolute h-2 w-2 bg-green-300 top-3 right-8 border rounded-full z-1"></div>
                )}
                {/*
                  eslint-disable
                */}
                <div
                  onClick={() => {
                    setBurgerState((state) => {
                      return !state
                    })
                  }}
                  onKeyDown={() => {}}
                  // role="button"
                  // tabIndex="0"
                  className="h-full w-full flex flex-col justify-center border-none burgerlineContainer z-20 headerGradient cursor-pointer"
                >
                  <div
                    className={`burgerline ${burgerState ? 'open' : ''}`}
                  ></div>
                </div>
                {/*eslint-enable */}

                <div
                  className={`h-${
                    isAuthenticated ? '80' : '40'
                  } w-24 absolute top-14 right-0 bg-gray-500 transform transition-all duration-500 ease-in-out -translate-y-${
                    burgerState
                      ? '0 z-10'
                      : '40 bg-opacity-0 text-transparent -z-10'
                  }`}
                >
                  <div
                    className={`h-8 w-20 z-30 absolute top-4 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0 -z-10'
                    }`}
                  >
                    {burgerState && (
                      <Link
                        to={routes.home()}
                        className="font-sans italic h-full flex flex-col justify-center hover:bg-green-300 hover:text-gray-700"
                      >
                        <span className="text-center">Home</span>
                      </Link>
                    )}
                  </div>
                  {/*eslint-disable*/}
                  <div
                    className={`h-8 w-20 z-30 absolute top-16 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0 -z-10'
                    }`}
                  >
                    {burgerState && (
                      <div
                        // role="button"
                        // tabIndex="0"
                        onKeyDown={() => {}}
                        onClick={
                          isAuthenticated
                            ? () => {
                                logOut()
                              }
                            : () => {
                                logIn()
                              }
                        }
                        className="font-sans italic h-full flex flex-col justify-center hover:bg-green-300 hover:text-gray-700"
                      >
                        <span className="text-center">{`${
                          isAuthenticated ? 'Logout' : 'Login'
                        }`}</span>
                      </div>
                    )}
                  </div>
                  {/*eslint-enable*/}
                  <div
                    className={`h-8 w-20 z-30 absolute top-28 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0 -z-10'
                    }`}
                  >
                    {burgerState && (
                      <Link
                        to={routes.about()}
                        className="font-sans italic h-full flex flex-col justify-center hover:bg-green-300 hover:text-gray-700"
                      >
                        <span className="text-center">About</span>
                      </Link>
                    )}
                  </div>
                  {isAuthenticated && (
                    <div
                      className={`h-8 w-20 z-30 absolute top-40 right-2 bg-overlay z-20 text-center ${
                        burgerState ? '' : 'bg-opacity-0 -z-10'
                      }`}
                    >
                      {burgerState && (
                        <Link
                          to={routes.type()}
                          className="font-sans italic h-full flex flex-col justify-center hover:bg-green-300 hover:text-gray-700"
                        >
                          <span className="text-center">Type</span>
                        </Link>
                      )}
                    </div>
                  )}
                  {isAuthenticated && (
                    <div
                      className={`h-8 w-20 z-30 absolute top-52 right-2 bg-overlay z-20 text-center ${
                        burgerState ? '' : 'bg-opacity-0 -z-10'
                      }`}
                    >
                      {burgerState && (
                        <Link
                          to={routes.expenses()}
                          className="font-sans italic h-full flex flex-col justify-center hover:bg-green-300 hover:text-gray-700"
                        >
                          <span className="text-center">Expense</span>
                        </Link>
                      )}
                    </div>
                  )}
                  {isAuthenticated && (
                    <div
                      className={`h-8 w-20 z-30 absolute top-64 right-2 bg-overlay z-20 text-center ${
                        burgerState ? '' : 'bg-opacity-0 -z-10'
                      }`}
                    >
                      {burgerState && (
                        <Link
                          to={routes.summary()}
                          className="font-sans italic h-full flex flex-col justify-center hover:bg-green-300 hover:text-gray-700"
                        >
                          <span className="text-center">Summary</span>
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className={`${maxWidth ? 'w-screen' : 'max-w-5xl mx-auto'}`}>
        {children}
      </main>
      <Footer />
    </Fragment>
  )
}

export default CommonLayout
