export const QUERY = gql`
  query TEST($user: String!) {
    textExpenseByType(user: $user)
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const beforeQuery = ({ user }) => {
  return {
    variables: { user },
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  }
}

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = ({ textExpenseByType }) => {
  return <h3 className="text-white">Summary Page</h3>
}
