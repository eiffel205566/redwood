import React from 'react'
import * as _ from 'lodash'
import { Money } from '../Misc/svg'

const Wrapper = ({ children, className, ...rest }) => {
  const { paddingLeft } = rest || {}
  //flex flex-col justify-center relative
  /*
  ${
    paddingLeft ? 'paddingLeft' : 'pl-1'
  }
  */
  return (
    <div className={`${className} text-xs sm:text-sm md:text-base`}>
      {children}
    </div>
  )
}

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
    wrapperClass,
    type = '',
  } = rest || {}
  const currentType = 'currentType'
  const tags = 'tags'

  return (
    <div key={index} className={parentClass + ' '}>
      {/*
        w-8 h-8 sm:h-12 sm:w-12 md:w-16 md:h-16 mx-auto
    */}
      <Wrapper className={`${wrapperClass} relative`}>
        <Money
          className={`text-${type ? 'red-500' : 'golden'} absolute top-0 ${
            type ? 'left' : 'left'
          }-0 h-3 w-3 sm:h-4 sm:w-4 bg-gray-900 rounded-full`}
        />
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
      </Wrapper>

      <p
        className={`${
          textColor ? textColor : ''
        } mx-1 text-xs sm:text-sm md:text-base text-center whitespace-nowrap select-none`}
      >
        {newName ? newName : description}
      </p>
    </div>
  )
}

export default SingleType
