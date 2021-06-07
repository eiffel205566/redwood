import { Link, routes } from '@redwoodjs/router'
import React, { Fragment, useState, useEffect } from 'react'
import { useQuery } from '@redwoodjs/web'
import { Toaster } from 'react-hot-toast'
import CommonLayout from 'src/layouts/CommonLayout/CommmonLayout'
import SummaryCell from 'src/components/SummaryCell/SummaryCell'
import { USER_TYPES_QUERY } from '../ExpensesPage/UserTypesTagsQuery'
import SummarySettings from 'src/components/Summary/SummarySettings'

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

  //state controling each type category
  const [typeCategoryState, setTypeCategoryState] = useState({
    types: null,
    availableTags: [],
    id: null,
    typeToEdit: null,
    chosenTagIds: [],
  })

  //USER_TYPES_QUERY
  //Make User Types Query onMount and store in staet
  const { data } = useQuery(USER_TYPES_QUERY, {
    variables: { input: { user } },
  })
  const { userTypes } = data || {}
  //* where availableTags stores all tag ids belong to the user so
  //* by using tag ids stored in availableTags, we can make Query expenseByType based on chosen tag ids
  const tagIds = data
    ? userTypes
        .reduce((prev, cur) => {
          return [...prev, ...cur.tags]
        }, [])
        .map((tag) => tag.id)
    : null

  useEffect(() => {
    setTypeCategoryState((state) => {
      return {
        ...state,
        types: data ? [...userTypes] : null,
        availableTags: tagIds ? [...tagIds] : [],
        chosenTagIds: tagIds ? [...tagIds] : [],
      }
    })
  }, [data, userTypes])

  return (
    <Fragment>
      {grandMasterLoading ? (
        <div className="masterLoadingOverlay select-none background bg-transparent absolute min-h-full min-w-full z-50"></div>
      ) : null}
      {typeCategoryState.typeToEdit ? (
        <SummarySettings
          setTypeCategoryState={setTypeCategoryState}
          typeCategoryState={typeCategoryState}
        />
      ) : null}
      <CommonLayout showSidebar={showSidebar} setShowSidebar={setShowSidebar}>
        <Toaster timeout={2000} />
        <SummaryCell
          user={user}
          typeCategoryState={typeCategoryState}
          setTypeCategoryState={setTypeCategoryState}
          chosenTagIds={typeCategoryState.chosenTagIds}
        />
      </CommonLayout>
    </Fragment>
  )
}

export default SummaryPage
