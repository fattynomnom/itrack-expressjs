import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import Resolvers from './Resolvers'
import Schema from './Schema'
import express from 'express'
import http from 'http'

const app = express()

// #region express
app.use(express.json())
// #endregion

// #region apollo
const startApolloServer = async (schema: any, resolvers: any) => {
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs: schema,
        resolvers,
        //tell Express to attach GraphQL functionality to the server
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    }) as any
    await server.start() //start the GraphQL server.
    server.applyMiddleware({ app })
    await new Promise<void>(
        resolve => httpServer.listen({ port: 4000 }, resolve) //run the server on port 4000
    )
    console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer(Schema, Resolvers)
// #endregion
