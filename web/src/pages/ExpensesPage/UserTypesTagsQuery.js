export const USER_TYPES_QUERY = gql`
  query USER_TYPES($input: QueryExpensesTypeInput!) {
    userTypes(input: $input) {
      id
      description
      newName
      tags {
        id
        tagName
      }
    }
  }
`
