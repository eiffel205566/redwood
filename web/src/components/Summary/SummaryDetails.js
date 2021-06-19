import React from 'react'
import { Wrapper } from '../Misc/UtilityFunc'

export const SummaryDetails = () => {
  return (
    <section className="h-full scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300 overflow-y-scroll">
      <div className="h-6 w-full p-1 border border-white flex">
        <div className="h-full w-10 rankBarContent"></div>
        <Wrapper className="cursor-default">
          <h3 className="text-white">Jun-03</h3>
        </Wrapper>
      </div>
    </section>
  )
}
