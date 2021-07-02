const Letter = ({ letter, index, len, direction }) => {
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

export default Letter
