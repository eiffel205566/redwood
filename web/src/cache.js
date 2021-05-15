import { InMemoryCache } from '@apollo/client'

const cache = new InMemoryCache({
  typePolicies: {
    ExpenseType: {
      fields: {
        tags: {
          merge(existing, incoming) {
            return [...incoming]
          },
        },
      },
    },
    Query: {
      fields: {
        userTypes: {
          merge(existing, incoming) {
            return [...incoming]
          },
        },
      },
    },
    Expense: {
      fields: {
        tags: {
          merge(existing, incoming) {
            return [...incoming]
          },
        },
      },
    },
  },
})

export default cache
