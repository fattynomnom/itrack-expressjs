import { ApolloContext } from './types.d'
import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import Resolvers from './Resolvers'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import http from 'http'
import { readFileSync } from 'fs'

dotenv.config()

const app = express()

// #region express config
app.use(express.json())
// #endregion

// #region auth0
const checkJwt = auth({
    audience: process.env.AUTH0_API_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_DOMAIN
})
// #endregion

// #region apollo
const startApolloServer = async () => {
    const httpServer = http.createServer(app)
    const typeDefs = readFileSync('src/Schema.graphql', { encoding: 'utf-8' })
    const server = new ApolloServer<ApolloContext>({
        typeDefs,
        resolvers: Resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    })
    await server.start()
    app.use(
        '/graphql',
        cors(),
        express.json(),
        checkJwt,
        expressMiddleware(server, {
            context: async ({ req }) => {
                const token = req.headers.authorization || ''
                console.log(1, token)

                console.log(2, req.auth?.payload)
                const email =
                    req.auth?.payload[process.env.AUTH0_EMAIL_CLAIM || '']
                const clientId = req.auth?.payload.azp

                return {
                    user: { email: email ? (email as string) : undefined },
                    clientId: clientId ? (clientId as string) : undefined
                }
            }
        })
    )
    await new Promise<void>(resolve =>
        httpServer.listen({ port: process.env.PORT }, resolve)
    )
    console.log(`Apollo server ready at ${process.env.BASE_URL}/graphql`)
}

startApolloServer()
// #endregion
