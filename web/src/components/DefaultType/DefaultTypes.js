import React from 'react'

import SingleType from 'src/components/DefaultType/SingleType'

import { defaultIcons } from 'src/components/DefaultType/Static'

const DefaultTypes = ({ setIconType, currentType, id }) => {
  // console.log(setIconType)
  return (
    <div className="col-span-1 sm:col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-y-scroll m-h-96 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
      {defaultIcons.map(([icon, description], index) => (
        <SingleType
          icon={icon}
          description={description}
          key={index}
          index={index}
          parentClass="w-max justify-self-center cursor-pointer relative"
          iconClass={
            description === currentType && !id
              ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto bg-green-300'
              : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto'
          }
          setIconType={setIconType}
          textColor="text-white"
        />
      ))}
    </div>
  )
}

export default DefaultTypes
