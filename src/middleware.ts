import { GraphQLError, GraphQLResolveInfo } from 'graphql'

import { ApolloContext } from './types.d'
import { ResolverFn } from './generated/graphql'

// only for authenticated users
const authenticateUserResolver = async (
    resolve: ResolverFn<object, object, ApolloContext, object>,
    parent: object,
    args: object,
    context: ApolloContext,
    info: GraphQLResolveInfo
) => {
    if (!context.user.email) {
        throw new GraphQLError('Unauthorized', {
            extensions: {
                code: '401'
            }
        })
    }

    return resolve(parent, args, context, info)
}

// only for authenticated machine to machine calls (ex: auth0)
const authenticateMachineResolver = async (
    resolve: ResolverFn<object, object, ApolloContext, object>,
    parent: object,
    args: object,
    context: ApolloContext,
    info: GraphQLResolveInfo
) => {
    if (context.clientId !== process.env.AUTH0_M2M_CLIENT_ID) {
        throw new GraphQLError('Access denied', {
            extensions: {
                code: '403'
            }
        })
    }

    return resolve(parent, args, context, info)
}

const Middlewares = {
    Query: {
        getTransactions: authenticateUserResolver
    },
    Mutation: {
        addTransaction: authenticateUserResolver,
        addUser: authenticateMachineResolver
    }
}

export default Middlewares
