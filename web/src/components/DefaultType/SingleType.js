import React from 'react'
import * as _ from 'lodash'

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
  const currentType = 'currentType'
  const tags = 'tags'

  return (
    <div key={index} className={parentClass + 'z-1'}>
      {React.createElement(icon, {
        className: noHoverNeeded
          ? iconClass
          : iconClass + ' sm:hover:bg-gray-300 cursor-pointer',
        onClick: setIconType
          ? () => {
              //e.stopPropagation()
              setIconType((state) => {
                if (currentType in state) {
                  //type page
                  return {
                    ...state,
                    id: id ? id : null,
                    currentType: description,
                    currentName: currentName,
                  }
                }
                if (tags in state) {
                  //NewEpense page
                  return {
                    ...state,
                    id: id ? id : null,
                    tags: {
                      ..._.find(state.types, function (o) {
                        return o?.id === id
                      }),
                    }[tags],
                  }
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
