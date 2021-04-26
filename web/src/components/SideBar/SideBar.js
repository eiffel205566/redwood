import React, { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'

const SideBar = ({ className }) => {
  return (
    <div className={className}>
      <ul className={`flex flex-col min-h-screen p-2 ${className}`}>
        <li className="h-14"></li>
        <li className="flex flex-col justify-center bg-gray-800 text-center w-full h-10 my-1 text-white hover:bg-green-300 hover:text-gray-900 cursor-pointer">
          <Link className="block">Setting</Link>
        </li>
        <li className="flex flex-col justify-center bg-gray-800 text-center w-full h-10 my-1 text-white hover:bg-green-300 hover:text-gray-900 cursor-pointer">
          <Link className="block">Setting</Link>
        </li>
        <li className="flex flex-col justify-center bg-gray-800 text-center w-full h-10 my-1 text-white hover:bg-green-300 hover:text-gray-900 cursor-pointer">
          <Link className="block">Setting</Link>
        </li>
      </ul>
    </div>
  )
}

export default SideBar
