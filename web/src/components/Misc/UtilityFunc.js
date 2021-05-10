export const truncate = (text, maxStringLength) => {
  const MAX_STRING_LENGTH = maxStringLength
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}

export const Wrapper = ({ children, className, ...rest }) => {
  const { onClick } = rest || {}
  return (
    <div
      onClick={onClick}
      className={`${className} flex flex-col justify-center pl-1 text-xs sm:text-sm md:text-base`}
    >
      {children}
    </div>
  )
}
