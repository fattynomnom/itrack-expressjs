import { ApolloContext, setApolloContext } from './setApolloContext'
import { Request, Response } from 'express'

import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@apollo/server/express4'

jest.mock('@apollo/server/express4')

describe('setApolloContext', () => {
    it('should call expressMiddleware', () => {
        const server = {} as ApolloServer<ApolloContext>
        setApolloContext(server)

        expect(expressMiddleware).toHaveBeenCalledWith(server, {
            context: expect.any(Function)
        })
    })

    it('should attach email and client id to context if any', async () => {
        let setContext
        jest.mocked(expressMiddleware).mockImplementationOnce(
            (_server, { context }) => {
                const req = {
                    headers: {
                        authorization: 'token'
                    },
                    auth: {
                        payload: {
                            [process.env.AUTH0_EMAIL_CLAIM as string]:
                                'test@mail.com',
                            azp: 'client-id'
                        }
                    }
                } as unknown as Request
                const res = {} as unknown as Response
                setContext = context({ req, res })

                return () => {}
            }
        )

        const server = {} as ApolloServer<ApolloContext>
        setApolloContext(server)

        const apolloContext = await setContext
        expect(apolloContext).toStrictEqual({
            user: {
                email: 'test@mail.com'
            },
            clientId: 'client-id'
        })
    })

    it('should attach undefined to context if no payload found', async () => {
        let setContext
        jest.mocked(expressMiddleware).mockImplementationOnce(
            (_server, { context }) => {
                const req = {
                    headers: {
                        authorization: 'token'
                    }
                } as unknown as Request
                const res = {} as unknown as Response
                setContext = context({ req, res })

                return () => {}
            }
        )

        const server = {} as ApolloServer<ApolloContext>
        setApolloContext(server)

        const apolloContext = await setContext
        expect(apolloContext).toStrictEqual({
            user: {
                email: undefined
            },
            clientId: undefined
        })
    })
})
