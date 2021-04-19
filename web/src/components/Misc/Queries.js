export const ALL_USER_ICONS = gql`
  query USEREXPENSETYPES($input: QueryExpensesTypeInput!) {
    userTypes(input: $input) {
      id
      description
      newName
      user
    }
  }
`
export const CREATE_TYPE = gql`
  mutation CREATETYPE($input: CreateExpenseTypeInput!) {
    createExpenseType(input: $input) {
      id
      description
      newName
      user
    }
  }
`

export const DELETE_TYPE = gql`
  mutation DELETETYPE($input: DeleteExpenseTypeInput!) {
    deleteExpenseType(input: $input) {
      id
      description
      newName
      user
    }
  }
`

export const UPDATE_TYPE = gql`
  mutation UPDATETYPE($input: UpdateExpenseTypeInput!) {
    updateExpenseType(input: $input) {
      id
      description
      newName
      user
    }
  }
`
