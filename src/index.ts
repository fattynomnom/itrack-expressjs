import { ApolloServer } from '@apollo/server'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import Resolvers from './Resolvers'
import Schema from './Schema'
import { User } from './models'
import { auth } from 'express-oauth2-jwt-bearer'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import { expressMiddleware } from '@apollo/server/express4'
import http from 'http'

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
interface ApolloContext {
    user: User
}

const startApolloServer = async () => {
    const httpServer = http.createServer(app)
    const server = new ApolloServer<ApolloContext>({
        typeDefs: Schema,
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

                return { user: { email: 'test@mail.com' } }
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
