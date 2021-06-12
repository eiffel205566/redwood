import { timeTag } from 'src/components/Expenses/Expenses'
import { ClockLoading } from 'src/components/Misc/svg'
import Summary from '../Summary/Summary'
export const QUERY = gql`
  query TEST($user: String!, $chosenTagIds: [Int]) {
    expenseByCategory(user: $user, chosenTagIds: $chosenTagIds)
  }
`

export const Loading = ({ user }) => (
  <div className="w-full mt-5 flex flex-col justify-center select-none">
    <h1 className="text-white text-xl">
      <ClockLoading className="h-8 w-8 cursor-not-allowed animate-spin inline p-1" />
    </h1>
  </div>
)

export const Empty = () => <div>Empty</div>

export const beforeQuery = ({ user, chosenTagIds }) => {
  return {
    variables: { user, chosenTagIds },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({
  expenseByCategory,
  typeCategoryState,
  setTypeCategoryState,
  chosenTagIds,
}) => {
  return (
    <Summary
      expenseByType={expenseByCategory[1]} //expenseByCategory index 1 is expenseByType
      expenseByDate={expenseByCategory[0]} //expenseByCategory index 0 is expenseByDate
      typeCategoryState={typeCategoryState}
      setTypeCategoryState={setTypeCategoryState}
      chosenTagIds={chosenTagIds}
    />
  )
}
