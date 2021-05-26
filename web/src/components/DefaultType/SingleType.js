import React from 'react'
import * as _ from 'lodash'
import { Money } from '../Misc/svg'

const SingleType = ({
  icon,
  description,
  index,
  parentClass,
  iconClass,
  ...rest
}) => {
  const {
    setIconType,
    id,
    newName,
    currentName,
    noHoverNeeded,
    textColor,
    newExpenseState,
  } = rest || {}
  const currentType = 'currentType'
  const tags = 'tags'

  return (
    <div key={index} className={parentClass + ' '}>
      {React.createElement(icon, {
        className: noHoverNeeded
          ? iconClass
          : iconClass + ' sm:hover:bg-gray-400 cursor-pointer',
        onClick: setIconType
          ? () => {
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
                    //when switch between expense type, clear out status storing chosen tags
                    chosenTags:
                      newExpenseState?.id === id ? [...state.chosenTags] : [],
                  }
                }
              })
            }
          : () => {},
      })}
      <p
        className={`${
          textColor ? textColor : ''
        } mx-1 text-xs sm:text-sm md:text-base text-center whitespace-nowrap`}
      >
        {newName ? newName : description}
      </p>
    </div>
  )
}

export default SingleType
