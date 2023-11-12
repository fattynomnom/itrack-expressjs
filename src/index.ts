import { ApolloServer } from '@apollo/server'
import Resolvers from './Resolvers'
import Schema from './Schema'
import dotenv from 'dotenv'
import express from 'express'
import expressListRoutes from 'express-list-routes'
import { startStandaloneServer } from '@apollo/server/standalone'

dotenv.config()

const app = express()

// #region apollo
// interface ApolloContext {
//     user: User
// }

const startApolloServer = async (
    schema: typeof Schema,
    resolvers: typeof Resolvers
) => {
    // const server = new ApolloServer<ApolloContext>({
    //     typeDefs: schema,
    //     resolvers
    // })
    // const { url } = await startStandaloneServer(server, {
    //     context: async ({ req }) => {
    //         // Get the user token from the headers.
    //         const token = req.headers.authorization || ''
    //         console.log(1, token)

    //         // Try to retrieve a user with the token
    //         // const user = await getUser(token)

    //         // Add the user to the context
    //         return { user: { email: 'test@mail.com' } }
    //     }
    // })
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers
    })
    const { url } = await startStandaloneServer(server)
    console.log(`Apollo server ready at ${url}`)
}

startApolloServer(Schema, Resolvers)
// #endregion

// #region express
app.use(express.json())

expressListRoutes(app)

console.log(`Server ready at ${process.env.BASE_URL}`)
// #endregion
