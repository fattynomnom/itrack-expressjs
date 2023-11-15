import Knex from './database'
import { MutationAddUserArgs, Resolvers } from './generated/graphql'
import { ApolloContext } from './types.d'

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
            user: MutationAddUserArgs,
            context: ApolloContext
        ) => {
            console.log(4, context)
            const rows = await Knex('users').insert(user, '*')
            return rows[0]
        }
    }
}

export default Resolvers
