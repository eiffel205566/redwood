import SideBar from '../../components/SideBar/SideBar'
import { useEffect, useState } from 'react'
import { Fragment } from 'react'
import { Link, routes } from '@redwoodjs/router'
import { Dots, Money } from '../../components/Misc/svg'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import { defaultIcons } from 'src/components/DefaultType/Static'
import { ClockLoading } from 'src/components/Misc/svg'

//constant

const TestPage = () => {
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = showSidebar

  return (
    <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
      <div
        className={`${
          sideBarShowed ? 'ml-0 sm:ml-40' : 'ml-0'
        } transition-all duration-500 ease-in-out`}
      ></div>
      <ClockLoading className="h-10 w-10" />
    </CommonLayout>
  )
}

export default TestPage
