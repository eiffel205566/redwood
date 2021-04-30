export const truncate = (text, maxStringLength) => {
  const MAX_STRING_LENGTH = maxStringLength
  let output = text
  if (text && text.length > MAX_STRING_LENGTH) {
    output = output.substring(0, MAX_STRING_LENGTH) + '...'
  }
  return output
}
