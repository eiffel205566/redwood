import React from 'react'

const SingleType = ({
  icon,
  description,
  index,
  parentClass,
  iconClass,
  ...rest
}) => {
  const { setIconType } = rest || {}
  const { id } = rest || {}

  return (
    <div key={index} className={parentClass}>
      {React.createElement(icon, {
        className: iconClass,
        onClick: setIconType
          ? () => {
              setIconType((state) => {
                return {
                  ...state,
                  currentType: description,
                  id: id ? id : null,
                }
              })
            }
          : () => {},
      })}
      <p className="mx-1 text-xs sm:text-sm md:text-base text-center">
        {description}
      </p>
    </div>
  )
}

export default SingleType

/*
    <div className="grid grid-cols-2 md:grid-cols-3 overflow-scroll m-h-96">
      {defaultIcons.map(([icon, description], index) => (
        <div key={index} className="w-max justify-self-center">
          {React.createElement(icon, {
            className:
              'w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full p-2 mx-auto',
          })}
          <p className="mx-1 text-sm md:text-base text-center">{description}</p>
        </div>
      ))}
    </div>
*/
