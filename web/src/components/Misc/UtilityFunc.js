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
      className={`${className} flex flex-col justify-center ${
        paddingLeft ? 'paddingLeft' : 'pl-1'
      } text-xs sm:text-sm md:text-base`}
    >
      {children}
    </div>
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
