export const schema = gql`
  type Expense {
    id: Int!
    name: String!
    amount: String!
    type: String!
    user: String!
  }

  type Query {
    expenses: [Expense!]!
  }

  input CreateExpenseInput {
    name: String!
    amount: String!
    type: String!
    user: String!
  }

  input UpdateExpenseInput {
    name: String
    amount: String
    type: String
  }

  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    updateExpense(id: Int!, input: UpdateExpenseInput): Expense!
    deleteExpense(id: Int!): Expense!
  }
`
