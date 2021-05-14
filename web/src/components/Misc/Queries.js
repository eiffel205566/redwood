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

export const ADD_ONE_TAG = gql`
  mutation addOneTag($input: CreateTagInput!) {
    createTag(input: $input) {
      id
      tagName
    }
  }
`

export const DELETE_TAGS = gql`
  mutation deleteManyTags($input: TagWhereInput!) {
    deleteTags(input: $input) {
      count
    }
  }
`
