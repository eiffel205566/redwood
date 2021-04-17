export const schema = gql`
  type Contact {
    id: Int!
    name: String!
    email: String!
    message: String!
    createdAt: DateTime!
    likes: [String!]!
  }

  type Query {
    contacts: [Contact!]!
    myContacts(email: String!): [Contact!]!
    searchMessage(message: String): [Contact!]!
    oneContact(input: OneContactInput!): Contact
  }

  input CreateContactInput {
    name: String!
    email: String!
    message: String!
  }

  input UpdateContactInput {
    name: String
    email: String
    message: String
  }

  input DeleteContactInput {
    id: Int!
  }

  input OneContactInput {
    id: Int!
  }

  input LikeContactInput {
    id: Int!
    email: String!
  }

  type Mutation {
    createContact(input: CreateContactInput!): Contact
    deleteContact(input: DeleteContactInput!): Contact
    likeContact(input: LikeContactInput): Contact
  }
`
