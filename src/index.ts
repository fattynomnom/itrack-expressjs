import { ApolloContext, setApolloContext } from './middlewares/setApolloContext'

import ApolloMiddleware from './middlewares/apolloMiddleware'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import Resolvers from './Resolvers'
import { applyMiddleware } from 'graphql-middleware'
import { checkJwt } from './middlewares/checkJwt'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import http from 'http'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { readFileSync } from 'fs'

dotenv.config()

const app = express()
const httpServer = http.createServer(app)
const typeDefs = readFileSync('src/Schema.graphql', { encoding: 'utf-8' })
const schema = makeExecutableSchema({ typeDefs, resolvers: Resolvers })
const schemaWithMiddleware = applyMiddleware(schema, ApolloMiddleware)
const server = new ApolloServer<ApolloContext>({
    schema: schemaWithMiddleware,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
})

const startApolloServer = async () => {
    await server.start()

    app.use('/graphql', express.json())
        .use(cors())
        .use(checkJwt)
        .use(setApolloContext(server))

    await new Promise<void>(resolve =>
        httpServer.listen({ port: process.env.PORT }, resolve)
    )

    console.log(`Apollo server ready at ${process.env.BASE_URL}/graphql`)
}

startApolloServer()

export default { app, server, httpServer }
