import { GraphQLError, GraphQLResolveInfo } from 'graphql'

import { ApolloContext } from '../setApolloContext'
import { ResolverFn } from '../../generated/graphql'

export const authenticateUserResolver = async (
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
