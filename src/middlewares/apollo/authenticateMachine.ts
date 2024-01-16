import { GraphQLError, GraphQLResolveInfo } from 'graphql'

import { ApolloContext } from '../setApolloContext'
import { ResolverFn } from '../../generated/graphql'

// only for authenticated machine to machine calls (ex: auth0)
export const authenticateMachineResolver = async (
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
