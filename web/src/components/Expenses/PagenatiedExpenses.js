import React, { Fragment, useState } from 'react'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { EXPENSENS_PER_PAGE } from 'web/src/components/Misc/Constant'
import { Left, Right } from 'src/components/Misc/svg'
import { Wrapper } from 'src/components/Misc/UtilityFunc'

const PagenatiedExpenses = ({ count, className }) => {
  const { search } = useLocation()
  const currentPageNum = Number(search.split('=')[1]) || 1 //by default no page #, always display 1st page

  const [translateX, setTranslateX] = useState({
    distance: currentPageNum < 5 ? 0 : currentPageNum - 4,
    // distance: 0,
  })

  return (
    <Fragment>
      {/*
       */}
      <Wrapper
        onClick={() =>
          setTranslateX((state) => {
            return {
              ...state,
              distance: state.distance === 0 ? 0 : --state.distance,
            }
          })
        }
        className="absolute right-32 text-white h-full hover:text-green-300 cursor-pointer"
      >
        <Left className="w-5" />
      </Wrapper>
      <div
        className={`smallCarousel h-full overflow-hidden absolute right-7 text-white flex ${className}`}
      >
        <ul
          className={`numberContainer -translate-x-${translateX.distance}p flex h-full transform transition-all duration-200`}
        >
          {Array(Math.ceil(count / EXPENSENS_PER_PAGE))
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className={`flex-grow pageNumber text-center hover:text-green-300 ${
                  index + 1 === currentPageNum
                    ? 'border border-green-300 pageNumber'
                    : ''
                }`}
              >
                <Link to={routes.expenses({ page: index + 1 })}>
                  {index + 1}
                </Link>
              </li>
            ))}
        </ul>
      </div>
      {/*

      */}
      <Wrapper
        onClick={() =>
          setTranslateX((state) => {
            return {
              ...state,
              distance:
                state.distance >= Math.floor(count / EXPENSENS_PER_PAGE) - 3
                  ? state.distance
                  : ++state.distance,
            }
          })
        }
        className="cursor-pointer hover:text-green-300 text-white"
      >
        <Right className="w-5" />
      </Wrapper>
    </Fragment>
  )
}

export default PagenatiedExpenses
