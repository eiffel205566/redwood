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
    tags: TagsWhereUniqueInput
  }

  input ExpenseTypeWhereUniqueInput {
    id: Int!
  }

  input UpdateExpenseInput {
    id: Int!
    tags: TagsWhereUniqueInput
  }

  input TagsWhereUniqueInput {
    ids: [Int]!
  }

  input ConnectTagsToExpenseInput {
    id: Int!
    tags: TagsWhereUniqueInput!
  }

  input AddTagInput {
    id: Int!
    tag: Int!
  }
  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    deleteExpense(id: Int!): Expense!
    connectTagsToExpense(input: ConnectTagsToExpenseInput!): Expense!
    addTag(input: AddTagInput!): Expense!
  }
`
