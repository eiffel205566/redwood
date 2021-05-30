import React, { Fragment } from 'react'
import SingleType from './SingleType'
import { Spin, Customize, ClockLoading } from 'src/components/Misc/svg'

const UserTypes = ({ userTypes, id, iconTypes, setIconType }) => {
  return userTypes?.map((oneType) => (
    <SingleType
      id={oneType.id}
      currentId={id}
      key={oneType.id}
      icon={iconTypes[oneType.description]}
      description={oneType.description}
      index={oneType.id}
      parentClass="singleTypeContainer w-full justify-self-center cursor-pointer"
      iconClass={
        id === oneType.id
          ? 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto bg-green-300'
          : 'w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 bg-gray-300 rounded-full p-2 mx-auto'
      }
      setIconType={setIconType}
      newName={oneType.newName}
      currentName={oneType.newName}
      textColor="text-white"
    />
  ))
}

export const Wrapper = (Component) => {
  return ({ ...props }) => {
    const { userTypes, allUserLoading } = props
    return (
      <div
        className={`mt-7 mb-5 ml-5 mr-5 sm:mx-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 bg-sideDark ${
          allUserLoading
            ? 'overflow-hidden'
            : 'overflow-y-scroll scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300'
        }  max-h-44 p-1 border rounded z-10 border-transparent`}
      >
        {allUserLoading ? (
          <Fragment>
            <ClockLoading className="w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 text-gray-500 m-auto" />
          </Fragment>
        ) : (
          userTypes &&
          (userTypes.length ? (
            <Component {...props} />
          ) : (
            <Fragment>
              <div className="text-xs sm:text-sm md:text-base col-span-3 text-white">
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
