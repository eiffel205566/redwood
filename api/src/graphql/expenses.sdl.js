export const schema = gql`
  type Expense {
    id: Int!
    amount: String!
    type: String!
    user: String!
  }

  type Query {
    expenses: [Expense!]!
    expense(id: Int!): Expense
  }

  input CreateExpenseInput {
    amount: String!
    type: String!
    user: String!
  }

  input UpdateExpenseInput {
    amount: String
    type: String
    user: String
  }

  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    updateExpense(id: Int!, input: UpdateExpenseInput!): Expense!
    deleteExpense(id: Int!): Expense!
  }
`
