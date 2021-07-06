export const truncate = (text, maxStringLength) => {
  const MAX_STRING_LENGTH = maxStringLength
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

export const Wrapper = ({ children, className, ...rest }) => {
  const { onClick, paddingLeft } = rest || {}
  return (
    <div
      onClick={onClick}
      onKeyDown={() => {}}
      tabIndex="0"
      role="button"
      className={`${className} flex flex-col justify-center ${
        paddingLeft ? 'paddingLeft' : 'pl-1'
      } text-xs sm:text-sm md:text-base`}
    >
      {children}
    </div>
  )
}

export const timeTag = (datetime) => {
  return (
    <Fragment>
      <div className="h-full text-xs md:text-sm flex flex-col justify-center text-displayOnly px-0.5 sm:px-1 md:px-2">
        <time>
          {new Date(datetime).toDateString().split(' ').slice(1).join(' ')}
        </time>
      </div>
    </Fragment>
  )
}

export const calculateWidth = (cur, maximum) => {
  //scale is tailwind default width like w-1, w.15 etc
  //we want this function to return the closest representation width
  const scale = [
    1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28,
    32, 36, 40, 44, 48, 52, 56, 60,
  ]
  const inner = (start = 0, end = 27, mid = 14) => {
    if (cur / maximum === scale[mid] / 60) return scale[mid]
    if (Math.abs(start - end) <= 1) return scale[start]
    if (cur / maximum < scale[mid] / 60) {
      return inner(start, mid, Math.floor((start + mid) / 2))
    }
    if (cur / maximum > scale[mid] / 60) {
      return inner(mid, end, Math.floor((mid + end) / 2))
    }
  }

  return inner()
}
export const formatDecimal = (num) => {
  return new Number(num).toPrecision(2)
}

export const generateRandomColors = (n, r = 51, g = 204, b = 153) => {
  // let r = 51
  // let g = 204
  // let b = 153

  const result = Array(n)
    .fill(null)
    .map((each, index) => {
      switch (index % 3) {
        case 0:
          if (r === 0) {
            r = 255
          } else {
            r = r - 51
          }
          return `rgb(${r}, ${g}, ${b}, 0.7)`

        case 1:
          if (g === 255) {
            g = 255
          } else {
            g = g - 51
          }

          return `rgb(${r}, ${g}, ${b}, 0.7)`
        case 2:
          if (b === 0) {
            b = 255
          } else {
            b = b - 51
          }
          return `rgb(${r}, ${g}, ${b}, 0.7)`
        default:
          break
      }
    })
  return result
}

export const LandingPageTag = ({ content, tagState, setTagState }) => {
  return (
    <div
      onClick={
        setTagState
          ? () => {
              setTagState((state) => {
                return {
                  ...state,
                  [content]: !state[content],
                }
              })
            }
          : () => {}
      }
      className="flex flex-col justify-center text-xs sm:text-sm md:text-base pl-1 text-center w-16 sm:w-32 h-12 select-none"
      onKeyDown={() => {}}
      role="button"
      tabIndex="0"
    >
      {tagState ? (
        <span
          className={`whitespace-nowrap rounded-full py-1 px-2 ${
            tagState[content]
              ? 'bg-green-300 text-black hover:bg-green-400'
              : 'bg-overlay text-white hover:bg-gray-500'
          }`}
        >
          {content}
        </span>
      ) : (
        <span className="whitespace-nowrap rounded-full py-1 px-2 bg-green-300 text-black hover:bg-green-400">
          {content}
        </span>
      )}
    </div>
  )
}

export const Letter = ({ letter, index, len, direction }) => {
  let ms
  let style

  if (Object.is(undefined, direction) || direction === 'forward') {
    //forward
    ms = index * 100 + 'ms'
    style = {
      opacity: '0',
      animationName: 'letterOpacity',
      animationTimingFunction: 'ease-in-out',
      animationDuration: '1s',
      animationDelay: ms,
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards',
    }
  } else {
    //backwards
    ms = (len - index) * 10 + 'ms'
    style = {
      opacity: '1',
      animationName: 'letterOpacityBack',
      animationTimingFunction: 'ease-in-out',
      animationDuration: '0.2s',
      animationDelay: ms,
      animationIterationCount: 1,
      animationDirection: 'normal',
      animationFillMode: 'forwards',
    }
  }

  return (
    <span index={index} style={{ ...style }} className="letter">
      {letter}
    </span>
  )
}
