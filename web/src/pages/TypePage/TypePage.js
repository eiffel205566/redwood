import { Link, routes } from '@redwoodjs/router'
import React from 'react'
import BlogLayout from '../../layouts/BlogLayout'
import { Spin } from 'src/components/Misc/svg'
import { useEffect, useState } from 'react'
import { iconTypes } from 'src/components/DefaultType/Static'
import { useQuery } from '@redwoodjs/web'
import { WrappedUserTypes } from 'src/components/DefaultType/UserTypes'
import DefaultForm from 'src/components/DefaultType/DefaultForm'

import { CREATE_TYPE, ALL_USER_ICONS } from 'src/components/Misc/Queries'

const TypePage = () => {
  //--
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
  const [iconType, setIconType] = useState({
    currentType: '',
    id: null,
    currentName: '',
  })
  const { currentType, id, currentName } = iconType

  const [types, setTypes] = useState({
    userTypes: null,
  })
  const { userTypes } = types

  const { data, loading: allUserLoading } = useQuery(ALL_USER_ICONS, {
    variables: { input: { user } },
    fetchPolicy: 'network-only',
  })
  const { userTypes: expenseTypes } = data || { userTypes: null }
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
    <BlogLayout>
      {/*

      */}
      <WrappedUserTypes
        id={id}
        userTypes={userTypes}
        iconTypes={iconTypes}
        setIconType={setIconType}
        allUserLoading={allUserLoading}
      />

      {/*
       */}
      <DefaultForm
        currentType={currentType}
        id={id}
        currentName={currentName}
        iconTypes={iconTypes}
        setIconType={setIconType}
        user={user}
        userTypes={userTypes}
      />
    </BlogLayout>
  )
}

export default TypePage
