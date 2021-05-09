import React from 'react'

const SingleType = ({
  icon,
  description,
  index,
  parentClass,
  iconClass,
  ...rest
}) => {
  const { setIconType, id, newName, currentName, noHoverNeeded, textColor } =
    rest || {}

  return (
    <div key={index} className={parentClass + ' z-1'}>
      {React.createElement(icon, {
        className: noHoverNeeded
          ? iconClass
          : iconClass + ' sm:hover:bg-gray-300 cursor-pointer',
        onClick: setIconType
          ? () => {
              //e.stopPropagation()
              setIconType((state) => {
                return {
                  ...state,
                  currentType: description,
                  id: id ? id : null,
                  currentName: currentName,
                }
              })
            }
          : () => {},
      })}
      <p
        className={`${
          textColor ? textColor : ''
        } mx-1 text-xs sm:text-sm md:text-base text-center`}
      >
        {newName ? newName : description}
      </p>
    </div>
  )
}

export default SingleType
