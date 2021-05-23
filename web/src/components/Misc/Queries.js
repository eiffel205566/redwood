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

export const ADD_ONE_EXPENSE = gql`
  mutation addOneExpense($input: CreateExpenseInput!) {
    createExpense(input: $input) {
      id
      amount
      user
      createdAt
      expenseType {
        id
        description
        newName
      }
      tags {
        id
        tagName
      }
    }
  }
`

export const UPDATE_ONE_EXPENSE = gql`
  mutation updateOneExpense($input: UpdateExpenseInput!) {
    updateExpense(input: $input) {
      id
      amount
      user
      createdAt
      expenseType {
        id
        description
        newName
      }
      tags {
        id
        tagName
      }
    }
  }
`

export const QUERY = gql`
  query EXPENSES($input: String!) {
    myExpenses(input: $input) {
      id
      amount
      createdAt
      expenseType {
        id
        user
        description
        newName
        tags {
          id
          tagName
        }
      }
      tags {
        id
      }
    }
  }
`

export const DELETE_ONE_EXPENSE = gql`
  mutation DeleteOneExpense($id: Int!) {
    deleteExpense(id: $id) {
      id
    }
  }
`
