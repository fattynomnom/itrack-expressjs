import { gql } from 'apollo-server-express'

const Schema = gql`
    type User {
        email: String!
    }

    type Query {
        getAllUsers: [User]
    }

    type Mutation {
        addUser(email: String): User
    }
`
export default Schema
