import React, { useState } from 'react'
import { Money } from '../Misc/svg'

const Switcher = ({ checkState, setCheckState, setIconType }) => {
  const { checked } = checkState
  /*eslint-disable*/
  return (
    <div
      onClick={() => {
        setIconType((state) => {
          return {
            ...state,
            currentType: '',
            id: null,
            currentName: '',
          }
        })

        setCheckState((state) => {
          return {
            ...state,
            checked: !state.checked,
          }
        })
      }}
      onKeyDown={() => {}}
      // tabIndex="0"
      // role="button"
      className={`border-opacity-0 transform transition-all duration-500 ease-in-out parent h-5 w-12 rounded-full bg-${
        checked ? 'red' : 'golden'
      }${checked ? '-500' : ''} cursor-pointer`}
    >
      <Money
        className={`translate-x-${
          checked ? '7' : '0'
        } text-gray-700 transform transition-all duration-500 ease-in-out absolute border-transparent rounded-full -inset-0 slider bg-transparent h-5 w-5 `}
      ></Money>
    </div>
  )
}

export default Switcher
