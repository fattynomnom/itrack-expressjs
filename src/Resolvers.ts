import { GraphQLError } from 'graphql'
import Knex from './database'
import {
    DefaultCategory,
    MutationAddUserArgs,
    Resolvers
} from './generated/graphql'
import { ApolloContext } from './types.d'
import crypto from 'crypto'

const Resolvers: Resolvers = {
    Query: {
        getAllUsers: async (
            _parent: unknown,
            _args: unknown,
            context: ApolloContext
        ) => {
            console.log(3, context)
            const rows = await Knex('users').select('*')
            return rows
        }
    },
    Mutation: {
        addUser: async (
            _: unknown,
            { email }: MutationAddUserArgs,
            { clientId }: ApolloContext
        ) => {
            // this API should only be called by Auth0
            if (clientId !== process.env.AUTH0_M2M_CLIENT_ID) {
                throw new GraphQLError('Access denied', {
                    extensions: {
                        code: '403'
                    }
                })
            }

            const defaultCategories =
                await Knex.select().from<DefaultCategory>('default_categories')
            const [users, categories] = await Promise.all([
                Knex('users').insert({ email }, '*'),
                Knex('categories').insert(
                    defaultCategories.map(category => ({
                        uid: crypto.randomUUID(),
                        name: category.name,
                        type: category.type,
                        color: category.color,
                        user_email: email
                    })),
                    '*'
                )
            ])

            return {
                ...users[0],
                categories
            }
        }
    }
}

export default Resolvers
