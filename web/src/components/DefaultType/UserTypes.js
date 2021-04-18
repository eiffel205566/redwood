import React from 'react'
import SingleType from './SingleType'

const UserTypes = ({ userTypes, id, iconTypes, setIconType }) => {
  return userTypes?.map((oneType) => (
    <SingleType
      id={oneType.id}
      currentId={id}
      key={oneType.id}
      icon={iconTypes[oneType.description]}
      description={oneType.description}
      index={oneType.id}
      parentClass="w-max justify-self-center cursor-pointer"
      iconClass={
        id === oneType.id
          ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto bg-green-300'
          : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto'
      }
      setIconType={setIconType}
      newName={oneType.newName}
      currentName={oneType.newName}
    />
  ))
}

export default UserTypes
