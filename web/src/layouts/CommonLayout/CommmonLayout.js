import { Fragment } from 'react'
import SideBar from '../../components/SideBar/SideBar'
import { Dots, Money } from '../../components/Misc/svg'
import { Link, routes } from '@redwoodjs/router'

const CommonLayout = ({ children, sideState, setSideState }) => {
  const { sideBarShowed } = sideState

  const onHandleSideBar = () => {
    setSideState((state) => {
      console.log(state)
      return {
        ...state,
        sideBarShowed: !sideBarShowed,
      }
    })
  }

  return (
    //stuff
    <Fragment>
      {/*
          //overlay
          <div className="cover min-h-screen min-w-full fixed bg-gray-500 -z-10"></div>
         */}

      <aside
        className={`transform ${
          sideBarShowed ? 'left-0' : '-left-40'
        } transition-all duration-500 ease-in-out min-h-screen fixed w-40 bg-gray-900`}
      >
        <SideBar className="w-40" />
      </aside>

      <header className="z-30">
        <nav className="h-14 w-full flex flex-row z-30">
          <div
            className="pl-5 bg-gray-400 cursor-pointer z-30"
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
          <div className="bg-gray-400 flex-grow text-center flex-col flex justify-center z-30">
            <h1 className="text-xl md:text-3xl font-semibold tracking-tight flex flex-row justify-center">
              <span>{'Exp '}</span>
              <span> </span>
              <span>In</span>
              {/*
               */}
              <span id="money" className="flex flex-col flex justify-center">
                <Money className="h-6 w-6 animate-bounce" />
              </span>
              <span>ight</span>
            </h1>
          </div>
          <div className="bg-gray-400 flex flex-row justify-center">
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
      </header>

      <main>{children}</main>
    </Fragment>
  )
}

export default CommonLayout
