import { Wrapper, calculateWidth } from '../Misc/UtilityFunc'

export const SummaryDetailItem = ({ amount, date }) => {
  const dateLong = new Date(date.replace('-', '/'))
  const dateText = dateLong.toDateString().split(' ').slice(1, 3).join('-')

  return (
    <div className="h-8 w-full p-1 border flex justify-between my-1">
      <div
        className={`h-full ${
          Math.abs(amount) >= 1000
            ? 'w-60'
            : calculateWidth(Math.abs(amount), 1000)
        } rankBarContent text-gray-200 text-center`}
      >
        <div className="h-full flex flex-col justify-center text-sm sm:text-base">
          <span>{`$${amount}`}</span>
        </div>
      </div>
      <Wrapper className="cursor-default">
        <h3 className="text-white text-xs sm:text-sm whitespace-nowrap">
          {dateText}
        </h3>
      </Wrapper>
    </div>
  )
}

export const ManyMany = () => {
  return (
    <div className="h-8 w-full p-1 border flex justify-between my-1">
      <div className="h-full w-60 rankBarContent text-gray-200 text-center">
        <div className="h-full flex flex-col justify-center text-sm sm:text-base">
          <span>xxxxx</span>
        </div>
      </div>
      <Wrapper className="cursor-default">
        <h3 className="text-white text-xs sm:text-sm whitespace-nowrap">
          Jun-03
        </h3>
      </Wrapper>
    </div>
  )
}

export const EndOfLine = () => {
  return (
    <div className="h-8 w-full p-1 flex justify-between my-1">
      <div className="h-full w-full text-gray-200 text-center">
        <div className="h-full flex flex-col justify-center text-sm sm:text-base">
          <span>--- End Of Data ---</span>
        </div>
      </div>
    </div>
  )
}
