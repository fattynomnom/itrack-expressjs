import { GraphQLError, GraphQLResolveInfo } from 'graphql'

import { ApolloContext } from './types.d'
import { ResolverFn } from './generated/graphql'

const authResolver = async (
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

const Middlewares = {
    Query: {
        getTransactions: authResolver
    },
    Mutation: {
        addTransaction: authResolver
    }
}

export default Middlewares
