import React, { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'

const SideBar = ({ className }) => {
  return (
    <Fragment>
      <div className="h-14 w-40 relative bg-gray-400 headerGradient"></div>
      <div className={className}>
        <ul className={`flex flex-col min-h-screen p-2 ${className}`}>
          <li className="flex flex-col justify-center bg-overlay text-center w-full h-10 my-1 text-white hover:bg-green-300 hover:text-gray-900 cursor-pointer">
            <Link to={routes.type()} className="block">
              Type Management
            </Link>
          </li>
          <li className="flex flex-col justify-center bg-overlay text-center w-full h-10 my-1 text-white hover:bg-green-300 hover:text-gray-900 cursor-pointer">
            <Link to={routes.expenses()} className="block">
              My Expenses
            </Link>
          </li>
          <li className="flex flex-col justify-center bg-overlay text-center w-full h-10 my-1 text-white hover:bg-green-300 hover:text-gray-900 cursor-pointer">
            <Link className="block">Setting</Link>
          </li>
        </ul>
      </div>
    </Fragment>
  )
}

export default SideBar
