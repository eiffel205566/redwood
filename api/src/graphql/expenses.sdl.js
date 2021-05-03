export const schema = gql`
  type Expense {
    id: Int!
    amount: String!
    user: String!
    createdAt: Date!
    expenseType: ExpenseType!
    tags: [Tag!]!
  }

  type Query {
    expenses: [Expense!]!
    expense(id: Int!): Expense
    myExpenses(input: String!): [Expense!]!
  }

  input CreateExpenseInput {
    amount: String!
    user: String!
    expenseType: ExpenseTypeWhereUniqueInput!
  }

  input ExpenseTypeWhereUniqueInput {
    id: Int!
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
