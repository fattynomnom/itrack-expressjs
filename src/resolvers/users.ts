import {
    DefaultCategory,
    MutationAddUserArgs,
    MutationResolvers,
    QueryResolvers
} from '../generated/graphql'

import { ApolloContext } from '../middlewares/setApolloContext'
import Knex from '../database'
import crypto from 'crypto'

interface UserResolvers {
    Query: Pick<QueryResolvers<ApolloContext>, 'getAllUsers'>
    Mutation: Pick<MutationResolvers<ApolloContext>, 'addUser'>
}

const Resolvers: UserResolvers = {
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
        addUser: async (_: unknown, { email }: MutationAddUserArgs) => {
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
