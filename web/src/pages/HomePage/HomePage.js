import React from 'react'
import { Fragment } from 'react'
import { Toaster } from 'react-hot-toast'
import BlogLayout from '../../layouts/BlogLayout'
import SummaryChart from 'src/components/Summary/SummaryChart'
const HomePage = () => {
  return (
    <Fragment>
      <BlogLayout>
        <div className="chart-container relative h-48 w-96 bg-gray-500">
          <SummaryChart />
        </div>
      </BlogLayout>
    </Fragment>
  )
}

export default HomePage
