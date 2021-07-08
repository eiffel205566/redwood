export const schema = gql`
  type Tag {
    id: Int!
    tagName: String!
    expenseType: ExpenseType!
    expenses: [Expense!]!
  }

  input CreateTagInput {
    tagName: String!
    expenseType: ExpenseTypeWhereUniqueInput!
  }

  input ExpenseTypeWhereUniqueInput {
    id: Int!
  }

  input ConnectTagInput {
    id: Int!
    expenses: ExpensesWhereUniqueInput!
  }

  input ExpensesWhereUniqueInput {
    ids: [Int]!
  }

  input TagWhereInput {
    ids: [Int]!
  }

  type BatchPayload {
    count: Int!
  }

  type Mutation {
    createTag(input: CreateTagInput!): Tag!
    connectTag(input: ConnectTagInput!): Tag!
    deleteTags(input: TagWhereInput!): BatchPayload!
  }
`
