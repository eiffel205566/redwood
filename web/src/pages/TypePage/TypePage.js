import { Link, routes } from '@redwoodjs/router'
import React, { Fragment } from 'react'
import { useAuth } from '@redwoodjs/auth'
// import BlogLayout from '../../layouts/BlogLayout'
// import TypeLayout from '../../layouts/TypeLayout'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import SideBar from '../../components/SideBar/SideBar'
import { Spin } from 'src/components/Misc/svg'
import { useEffect, useState } from 'react'
import { iconTypes } from 'src/components/DefaultType/Static'
import { useQuery } from '@redwoodjs/web'
import { WrappedUserTypes } from 'src/components/DefaultType/UserTypes'
import DefaultForm from 'src/components/DefaultType/DefaultForm'
import Error from 'src/components/Error/Error'

import { CREATE_TYPE, ALL_USER_ICONS } from 'src/components/Misc/Queries'
import Confirmation from 'src/components/Confirmation/Confirmation'

const TypePage = () => {
  //--
  const { logIn, logOut } = useAuth()
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

  //hooks
  //focused iconed type
  const [iconType, setIconType] = useState({
    currentType: '',
    id: null,
    currentName: '',
  })
  const { currentType, id, currentName } = iconType

  //query results of all icon types for the logged in user
  const [types, setTypes] = useState({
    userTypes: null,
  })
  const { userTypes } = types

  //gql query
  const { data, loading: allUserLoading } = useQuery(ALL_USER_ICONS, {
    variables: { input: { user } },
    fetchPolicy: 'network-only',
  })
  const { userTypes: expenseTypes } = data || { userTypes: null }

  //error state for Type Page component
  const [typePageErrorState, setTypePageErrorState] = useState({
    errorState: false,
    errorMessage: null,
  })
  const { errorState } = typePageErrorState

  //state for updating input field
  const [typePageFormDesc, setTypePageFormDesc] = useState({
    typePageDescription: '',
  })

  //state for displaying confirmation component
  const [needConfirm, setNeedConfirm] = useState({
    confirmNeeded: false,
  })
  const { confirmNeeded } = needConfirm

  //side bar state
  const [showSidebar, setShowSidebar] = useState({
    sideBarShowed: false,
  })
  const { sideBarShowed } = showSidebar
  //--

  //lifecycle: onmount
  useEffect(() => {
    setTypes((state) => {
      return {
        ...state,
        userTypes: expenseTypes ? [...expenseTypes] : null,
      }
    })
  }, [data])
  //--

  //handlers

  //--

  return (
    <Fragment>
      {errorState && (
        <Error
          setIconType={setIconType}
          setTypePageErrorState={setTypePageErrorState}
          setTypePageFormDesc={setTypePageFormDesc}
          typePageErrorState={typePageErrorState}
        />
      )}

      {!errorState && confirmNeeded && (
        <Confirmation
          setTypePageFormDesc={setTypePageFormDesc}
          currentName={currentName}
          setTypePageErrorState={setTypePageErrorState}
          setIconType={setIconType}
          setNeedConfirm={setNeedConfirm}
          id={id}
          user={user}
          userTypes={userTypes}
        />
      )}

      {/*
        {sideBarShowed && (
          <aside className="absolute min-h-screen w-40 bg-gray-900">
            <SideBar className="w-40" />
          </aside>
        )}
      */}
      <CommonLayout
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
        logIn={logIn}
        logOut={logOut}
        isAuthenticated={isAuthenticated}
      >
        <div
          className={`${
            sideBarShowed ? 'ml-0 sm:ml-40 xl:ml-0' : 'ml-0'
          } transition-all duration-500 ease-in-out flex`}
        >
          {/*
            {sideBarShowed && <div className="w-0 md:w-40 -z-10"></div>}
           */}
          {/*
            // try to cheese with overlay sidebar
            {sideBarShowed && (
              <div className="md:hidden">
                <Confirmation
                  setTypePageFormDesc={setTypePageFormDesc}
                  currentName={currentName}
                  setTypePageErrorState={setTypePageErrorState}
                  setIconType={setIconType}
                  setNeedConfirm={setNeedConfirm}
                  id={id}
                  user={user}
                  userTypes={userTypes}
                />
              </div>
            )}
          */}
          <h3 className="absolute text-white text-sm sm:text-base mx-5 sm:mx-10">
            Your Exp Types
          </h3>
          <div className="w-full">
            <WrappedUserTypes
              id={id}
              userTypes={userTypes}
              iconTypes={iconTypes}
              setIconType={setIconType}
              allUserLoading={allUserLoading}
            />
            <DefaultForm
              currentType={currentType}
              id={id}
              currentName={currentName}
              iconTypes={iconTypes}
              setIconType={setIconType}
              user={user}
              userTypes={userTypes}
              setTypePageErrorState={setTypePageErrorState}
              typePageFormDesc={typePageFormDesc}
              setTypePageFormDesc={setTypePageFormDesc}
              setNeedConfirm={setNeedConfirm}
            />
          </div>
        </div>
      </CommonLayout>
    </Fragment>
  )
}

export default TypePage
