export const schema = gql`
  type ExpenseType {
    id: Int!
    description: String!
    newName: String!
    user: String!
    expenses: [Expense!]!
    tags: [Tag!]!
  }

  type Query {
    expenseTypes: [ExpenseType!]!
    userTypes(input: QueryExpensesTypeInput!): [ExpenseType!]!
  }

  input QueryExpensesTypeInput {
    user: String!
  }

  input CreateExpenseTypeInput {
    description: String!
    newName: String!
    user: String!
  }

  input UpdateExpenseTypeInput {
    id: Int!
    newName: String!
  }

  input DeleteExpenseTypeInput {
    id: Int!
  }

  type Mutation {
    createExpenseType(input: CreateExpenseTypeInput): ExpenseType
    deleteExpenseType(input: DeleteExpenseTypeInput): ExpenseType
    updateExpenseType(input: UpdateExpenseTypeInput): ExpenseType
  }
`
