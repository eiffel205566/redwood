import { Fragment } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Dots, Money } from '../../components/Misc/svg'
import { Link, routes } from '@redwoodjs/router'
import { useState } from 'react'

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

      <aside
        className={`sidebarContainer transform ${
          sideBarShowed ? 'left-0' : '-left-40'
        } transition-all duration-500 ease-in-out min-h-screen fixed w-40 bg-sideDark`}
      >
        <SideBar className="w-40" />
      </aside>

      <header className="h-14 z-30 headerGradient text-gray-300 select-none w-screen">
        {/*

        */}
        <div className="h-full max-w-5xl mx-auto">
          <div className="z-30 bg-gray-400">
            <nav className="h-14 min-w-full flex flex-row z-20">
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
              <div className="navButtons flex flex-row justify-center headerGradient relative w-24">
                <div
                  onClick={() => {
                    setBurgerState((state) => {
                      return !state
                    })
                  }}
                  onKeyDown={() => {}}
                  role="button"
                  tabIndex="0"
                  className="h-full flex flex-col justify-center burgerlineContainer"
                >
                  <div
                    className={`burgerline ${burgerState ? 'open' : ''}`}
                  ></div>
                </div>
                <div
                  className={`h-80 w-24 absolute top-12 right-0 z-10 bg-gray-500 transform transition-all duration-500 ease-in-out translate-x-${
                    burgerState ? '0' : '40 bg-opacity-0 text-transparent'
                  }`}
                >
                  <div
                    className={`h-8 w-20 z-30 absolute top-4 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0'
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
                  <div
                    className={`h-8 w-20 z-30 absolute top-16 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0'
                    }`}
                  >
                    <span className={'h-full flex flex-col justify-center'}>
                      Login
                    </span>
                  </div>
                  <div
                    className={`h-8 w-20 z-30 absolute top-28 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0'
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
                  <div
                    className={`h-8 w-20 z-30 absolute top-40 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0'
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
                  <div
                    className={`h-8 w-20 z-30 absolute top-52 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0'
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
                  <div
                    className={`h-8 w-20 z-30 absolute top-64 right-2 bg-overlay z-20 text-center ${
                      burgerState ? '' : 'bg-opacity-0'
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
                </div>
                {/*
                  <div className="w-0 sm:w-16 hidden sm:flex hover:bg-gray-700 flex-col justify-center cursor-pointer">
                    <Link className="font-sans italic h-full flex flex-col justify-center">
                      <span className="text-center">Login</span>
                    </Link>
                  </div>
                  <div className="w-0 sm:w-16 hidden sm:flex hover:bg-gray-700 flex-col justify-center cursor-pointer">
                    <Link
                      to={routes.home()}
                      className="font-sans italic h-full flex flex-col justify-center"
                    >
                      <span className="text-center">Home</span>
                    </Link>
                  </div>
                  <div className="w-0 sm:w-16 hidden sm:flex hover:bg-gray-700 flex-col justify-center cursor-pointer">
                    <Link
                      to={routes.about()}
                      className="font-sans italic h-full flex flex-col justify-center"
                    >
                      <span className="text-center">About</span>
                    </Link>
                  </div>
                */}
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className={`${maxWidth ? 'w-screen' : 'max-w-5xl mx-auto'}`}>
        {children}
      </main>
    </Fragment>
  )
}

export default CommonLayout
