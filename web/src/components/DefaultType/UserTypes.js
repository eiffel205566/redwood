import React, { Fragment } from 'react'
import SingleType from './SingleType'
import { Spin, Customize } from 'src/components/Misc/svg'

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

export const Wrapper = (Component) => {
  return ({ ...props }) => {
    const { userTypes, allUserLoading } = props
    return (
      <div className="m-5 sm:m-10 md:m-20 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-gray-200 overflow-scroll max-h-72 p-1 rounded-xl">
        {allUserLoading ? (
          <Spin className="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 text-gray-500 animate-spin m-auto" />
        ) : (
          userTypes &&
          (userTypes.length ? (
            <Component {...props} />
          ) : (
            <Fragment>
              <div className="text-xs sm:text-sm md:text-base col-span-3">
                Add Your Own Expense Type to Start!
              </div>
            </Fragment>
          ))
        )}
      </div>
    )
  }
}

export const WrappedUserTypes = Wrapper(UserTypes)

export default UserTypes