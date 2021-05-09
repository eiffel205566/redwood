import { Fragment } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Dots, Money } from '../../components/Misc/svg'
import { Link, routes } from '@redwoodjs/router'

const CommonLayout = ({
  children,
  showSidebar,
  setShowSidebar,
  logIn = () => {},
  logOut = () => {},
  isAuthenticated = false,
  currentUser = { email: 'fakeuser2.expinsight@gmail.com' },
}) => {
  const { sideBarShowed } = showSidebar

  const onHandleSideBar = () => {
    setShowSidebar((state) => {
      return {
        ...state,
        sideBarShowed: !sideBarShowed,
      }
    })
  }

  return (
    <Fragment>
      {/*
          //overlay
        */}
      <div className="cover min-h-screen min-w-full fixed bg-overlay -z-10"></div>

      <aside
        className={`transform ${
          sideBarShowed ? 'left-0' : '-left-40'
        } transition-all duration-500 ease-in-out min-h-screen fixed w-40 bg-sideDark`}
      >
        <SideBar className="w-40 z-1" />
      </aside>

      <header className="h-14 z-30 bg-gray-400">
        {/*

        */}
        <div className="h-full max-w-5xl mx-auto">
          <div className="z-30 bg-gray-400">
            <nav className="h-14 w-full flex flex-row z-20">
              <div
                className="cursor-pointer bg-gray-400 w-10 flex flex-row justify-center z-10"
                onClick={onHandleSideBar}
              >
                <Dots
                  className={
                    sideBarShowed
                      ? 'h-full w-6 transition duration-500 ease-in-out transform hover:text-gray-300'
                      : 'h-full w-6 transition duration-500 ease-in-out transform rotate-90 hover:text-gray-300'
                  }
                />
              </div>
              <div className="text-center flex-grow flex-col flex justify-center z-10 bg-gray-400">
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
              <div className="flex flex-row justify-center">
                <div className="w-0 sm:w-16 hidden sm:flex hover:bg-gray-300 flex-col justify-center cursor-pointer">
                  <Link className="m-auto">Login</Link>
                </div>
                <div className="w-0 sm:w-16 hidden sm:flex hover:bg-gray-300 flex-col justify-center cursor-pointer">
                  <Link to={routes.home()} className="m-auto">
                    Home
                  </Link>
                </div>
                <div className="w-0 sm:w-16 hidden sm:flex hover:bg-gray-300 flex-col justify-center cursor-pointer">
                  <Link to={routes.about()} className="m-auto">
                    About
                  </Link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto">{children}</main>
    </Fragment>
  )
}

export default CommonLayout
