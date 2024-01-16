import { GraphQLError, GraphQLResolveInfo } from 'graphql'

import { ApolloContext } from '../setApolloContext'
import { authenticateMachineResolver } from './authenticateMachine'

describe('authenticateMachine', () => {
    const info = {
        fieldName: 'field-name'
    } as GraphQLResolveInfo

    it('should throw 403 error', async () => {
        const resolve = () => ({})
        const context: ApolloContext = {
            user: {},
            clientId: 'test'
        }
        const error = new GraphQLError('Access denied', {
            extensions: {
                code: '403'
            }
        })

        await expect(
            authenticateMachineResolver(resolve, {}, {}, context, info)
        ).rejects.toThrow(error)
    })

    it('should return resolve function', async () => {
        const parent = {}
        const args = { userId: '123 ' }
        const context: ApolloContext = {
            user: {},
            clientId: process.env.AUTH0_M2M_CLIENT_ID
        }
        const resolve = (
            parentArg: object,
            argsArg: object,
            contextArg: ApolloContext,
            graphqInfo: GraphQLResolveInfo
        ) => {
            expect(parentArg).toStrictEqual(parent)
            expect(argsArg).toStrictEqual(args)
            expect(contextArg).toStrictEqual(context)
            expect(graphqInfo).toStrictEqual(info)

            return {
                success: true
            }
        }
        const output = await authenticateMachineResolver(
            resolve,
            parent,
            args,
            context,
            info
        )

        expect(output).toStrictEqual({ success: true })
    })
})
