import React from 'react'
import { truncate } from '../Misc/UtilityFunc'

const Carousel = ({ translateDistance }) => {
  const { translateX } = translateDistance || false
  return (
    <div className="carousel the-small-one h-full bg-gray-600 overflow-hidden">
      <ul className="allTags the-infinite-row text-xs sm:text-sm md:text-base h-full">
        <li
          className={`${
            translateX ? '-translate-x-32' : ''
          } inline-block h-full transform transition-all duration-500 ease-in-out`}
        >
          <Tag content={'beer time'} />
        </li>
        <li
          className={`${
            translateX ? '-translate-x-32' : ''
          } inline-block h-full transform transition-all duration-500 ease-in-out`}
        >
          <Tag content={'mess around'} />
        </li>
        <li
          className={`${
            translateX ? '-translate-x-32' : ''
          } inline-block h-full transform transition-all duration-500 ease-in-out`}
        >
          <Tag content={'Fun'} />
        </li>
        <li
          className={`${
            translateX ? '-translate-x-32' : ''
          } inline-block h-full transform transition-all duration-500 ease-in-out`}
        >
          <Tag content={'hang out'} />
        </li>
      </ul>
    </div>
  )
}

const Tag = ({ content, setTagEditState = () => {} }) => {
  return (
    <div
      className={`${
        content ? '' : 'text-displayOnly'
      } flex flex-col justify-center text-xs sm:text-sm md:text-base pl-1 text-center w-32 h-full`}
    >
      <span className="rounded-full py-1 px-2 bg-overlay">
        {content ? (
          truncate(content, 8)
        ) : (
          <input
            onBlur={() => {
              setTagEditState((state) => {
                return {
                  ...state,
                  id: null,
                  editState: false,
                }
              })
            }}
            className="bg-overlay border focus:border-green-300 w-full"
          ></input>
        )}
      </span>
    </div>
  )
}

export default Carousel
