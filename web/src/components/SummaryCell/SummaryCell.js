import { timeTag } from 'src/components/Expenses/Expenses'
import { ClockLoading } from 'src/components/Misc/svg'
import Summary from '../Summary/Summary'
export const QUERY = gql`
  query TEST($user: String!) {
    textExpenseByType(user: $user)
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

export const beforeQuery = ({ user }) => {
  return {
    variables: { user },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({
  textExpenseByType,
  typeCategoryState,
  setTypeCategoryState,
}) => {
  return (
    <Summary
      textExpenseByType={textExpenseByType}
      typeCategoryState={typeCategoryState}
      setTypeCategoryState={setTypeCategoryState}
    />
  )
}
