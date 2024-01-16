import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

export interface ApolloContext {
    user: {
        email?: string
    }
    clientId?: string
}

export const setApolloContext = (server: ApolloServer<ApolloContext>) =>
    expressMiddleware(server, {
        context: async ({ req }) => {
            const token = req.headers.authorization || ''
            console.log(1, token)

            console.log(2, req.auth?.payload)
            const email = req.auth?.payload[process.env.AUTH0_EMAIL_CLAIM || '']
            const clientId = req.auth?.payload.azp

            return {
                user: { email: email ? (email as string) : undefined },
                clientId: clientId ? (clientId as string) : undefined
            }
        }
    })
