import React from 'react'
import { Link, routes, useLocation } from '@redwoodjs/router'
import { EXPENSENS_PER_PAGE } from 'web/src/components/Misc/Constant'

const PagenatiedExpenses = ({ count, className }) => {
  const { search } = useLocation()
  const currentPageNum = Number(search.split('=')[1])

  return (
    <div className={`text-white flex px-2 ${className}`}>
      {Array(Math.ceil(count / EXPENSENS_PER_PAGE))
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`w-5 text-center hover:text-green-300 ${
              index + 1 === currentPageNum ? 'border border-green-300' : ''
            }`}
          >
            <Link to={routes.expenses({ page: index + 1 })}>{index + 1}</Link>
          </div>
        ))}
    </div>
  )
}

export default PagenatiedExpenses
