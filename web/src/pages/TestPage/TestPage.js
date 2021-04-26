import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Dots, Money } from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'

//constant

const TestPage = () => {
  const [sideState, setSideState] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = sideState

  return (
    <CommonLayout sideState={sideState} setSideState={setSideState}>
      <div
        className={`${
          sideBarShowed ? 'ml-40' : 'ml-0'
        } transition-all duration-500 ease-in-out`}
      >
        <div className="w-full text-center h-60">content</div>
        <div className="w-full text-center h-60">content</div>
        <div className="w-full text-center h-60">content</div>
        <div className="w-full text-center h-60">content</div>
        <div className="w-full text-center h-60">content</div>
        <div className="w-full text-center h-60">content</div>
      </div>
    </CommonLayout>
  )
}

export default TestPage
