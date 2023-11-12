const Schema = `#graphql
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
