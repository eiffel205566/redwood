export const schema = gql`
  type Expense {
    id: Int!
    amount: Float!
    user: String!
    createdAt: Date!
    expenseType: ExpenseType!
    tags: [Tag!]!
  }

  type Query {
    expenses: [Expense!]!
    expense(id: Int!): Expense
    myExpenses(input: String!): [Expense!]!
    expensePage(page: Int, user: String!): ExpensePage
    expenseCount(user: String!): Int!
    userExpensesSum(input: OneUserAllExpenseInput!): Float!
    textExpenseByType(user: String!, maxDate: Date, minDate: Date): JSON!
    expenseByDate(user: String!, maxDate: Date, mindDate: Date): JSON!
  }

  type ExpensePage {
    myExpenses: [Expense!]!
    count: Int!
  }

  input CreateExpenseInput {
    amount: Float!
    user: String!
    expenseType: ExpenseTypeWhereUniqueInput!
    tags: TagsWhereUniqueInput
  }

  input ExpenseTypeWhereUniqueInput {
    id: Int!
  }

  input UpdateExpenseInput {
    id: Int!
    amount: Float
    createdAt: Date
    expenseType: ExpenseTypeWhereUniqueInput
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

  input OneUserAllExpenseInput {
    user: String!
    maxDate: Date
    mindDate: Date
  }
  type Mutation {
    createExpense(input: CreateExpenseInput!): Expense!
    deleteExpense(id: Int!): Expense!
    connectTagsToExpense(input: ConnectTagsToExpenseInput!): Expense!
    addTag(input: AddTagInput!): Expense!
    updateExpense(input: UpdateExpenseInput!): Expense!
  }
`
