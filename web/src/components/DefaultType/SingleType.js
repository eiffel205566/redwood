import React from 'react'

const SingleType = ({
  icon,
  description,
  index,
  parentClass,
  iconClass,
  ...rest
}) => {
  const { setIconType, id, newName, currentName } = rest || {}

  return (
    <div key={index} className={parentClass + 'z-1'}>
      {React.createElement(icon, {
        className: iconClass + ' hover:bg-gray-300',
        onClick: setIconType
          ? (e) => {
              e.stopPropagation()
              setIconType((state) => {
                return {
                  ...state,
                  currentType: description,
                  id: id ? id : null,
                  currentName: currentName,
                }
              })
            }
          : () => {
              console.log('haha')
            },
      })}
      <p className="mx-1 text-xs sm:text-sm md:text-base text-center">
        {newName ? newName : description}
      </p>
    </div>
  )
}

export default SingleType
