import { Link, routes } from '@redwoodjs/router'
import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Toaster } from 'react-hot-toast'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import SummaryCell from 'src/components/SummaryCell/SummaryCell'

const SummaryPage = () => {
  //side bar state
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })

  //loading state
  const [grandMasterLoadingState, setGrandMasterLoadingState] = useState({
    grandMasterLoading: false,
  })
  const { grandMasterLoading } = grandMasterLoadingState

  // fake user
  const currentUser = {
    app_metadata: {
      provider: 'email',
    },
    email: 'fakeuser2.expinsight@gmail.com',
    exp: 1616348450,
    sub: '3cff8205-96d0-464a-a6c2-31043649f687',
    user_metadata: {
      full_name: 'Fake User',
    },
    roles: [],
  }
  const isAuthenticated = true
  const { email: user } = currentUser
  //--

  return (
    <Fragment>
      {grandMasterLoading ? (
        <div className="masterLoadingOverlay select-none background bg-transparent absolute min-h-full min-w-full z-50"></div>
      ) : null}

      <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        <Toaster timeout={2000} />
        <SummaryCell user={user} />
      </CommonLayout>
    </Fragment>
  )
}

export default SummaryPage
