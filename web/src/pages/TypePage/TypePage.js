import { Link, routes } from '@redwoodjs/router'
import React, { Fragment } from 'react'
import { useAuth } from '@redwoodjs/auth'
// import BlogLayout from '../../layouts/BlogLayout'
// import TypeLayout from '../../layouts/TypeLayout'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import SideBar from '../../components/SideBar/SideBar'
import { Spin } from 'src/components/Misc/svg'
import { useEffect, useState } from 'react'
import { iconTypes, incomeIconTypes } from 'src/components/DefaultType/Static'
import { useQuery } from '@redwoodjs/web'
import { WrappedUserTypes } from 'src/components/DefaultType/UserTypes'
import DefaultForm from 'src/components/DefaultType/DefaultForm'
import Error from 'src/components/Error/Error'

import { CREATE_TYPE, ALL_USER_ICONS } from 'src/components/Misc/Queries'
import Confirmation from 'src/components/Confirmation/Confirmation'
import Switcher from 'src/components/DefaultType/Switcher'

const TypePage = () => {
  //--
  const { logIn, logOut, isAuthenticated, currentUser } = useAuth()
  // const currentUser = {
  //   app_metadata: {
  //     provider: 'email',
  //   },
  //   email: 'fakeuser2.expinsight@gmail.com',
  //   exp: 1616348450,
  //   sub: '3cff8205-96d0-464a-a6c2-31043649f687',
  //   user_metadata: {
  //     full_name: 'Fake User',
  //   },
  //   roles: [],
  // }
  // const isAuthenticated = true
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

  //checkState for expense/income type
  const [checkState, setCheckState] = useState({
    checked: false,
  })
  //

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
        logIn={logIn}
        logOut={logOut}
        isAuthenticated={isAuthenticated}
        currentUser={currentUser}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      >
        <div
          className={`${
            sideBarShowed ? 'ml-0 sm:ml-40 xl:ml-0' : 'ml-0'
          } transition-all duration-500 ease-in-out flex`}
        >
          {/*
           */}

          <div className="absolute w-30 flex mx-5 sm:mx-10 text-sm sm:text-base">
            <span
              className={`${
                checkState.checked ? 'text-red-500' : 'text-yellow-300'
              } Type`}
            >{`${checkState.checked ? 'Income' : 'Expense'} Type`}</span>
            <div className="h-full my-auto ml-2">
              <Switcher
                setIconType={setIconType}
                checkState={checkState}
                setCheckState={setCheckState}
              />
            </div>
          </div>
          <div className="w-full">
            <WrappedUserTypes
              id={id}
              userTypes={userTypes}
              iconTypes={iconTypes}
              incomeIconTypes={incomeIconTypes}
              setIconType={setIconType}
              allUserLoading={allUserLoading}
              checkState={checkState}
            />
            <section className="helpfulText text-white h-1 sm:h-8 max-w-5xl mx-10 flex justify-between"></section>
            <DefaultForm
              currentType={currentType}
              id={id}
              currentName={currentName}
              iconTypes={iconTypes}
              incomeIconTypes={incomeIconTypes}
              setIconType={setIconType}
              user={user}
              userTypes={userTypes}
              setTypePageErrorState={setTypePageErrorState}
              typePageFormDesc={typePageFormDesc}
              setTypePageFormDesc={setTypePageFormDesc}
              setNeedConfirm={setNeedConfirm}
              checkState={checkState}
            />
          </div>
        </div>
      </CommonLayout>
    </Fragment>
  )
}

export default TypePage
