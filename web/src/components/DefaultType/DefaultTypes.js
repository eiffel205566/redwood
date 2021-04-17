import React from 'react'

import SingleType from 'src/components/DefaultType/SingleType'

import { defaultIcons } from 'src/components/DefaultType/Static'

const DefaultTypes = ({ setIconType, currentType }) => {
  return (
    <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 overflow-scroll m-h-96">
      {defaultIcons.map(([icon, description], index) => (
        <SingleType
          icon={icon}
          description={description}
          key={index}
          index={index}
          parentClass="w-max justify-self-center cursor-pointer"
          iconClass={
            description === currentType
              ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto bg-green-300'
              : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto'
          }
          setIconType={setIconType}
        />
      ))}
    </div>
  )
}

export default DefaultTypes