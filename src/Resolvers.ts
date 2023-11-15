import Knex from './database'
import { MutationAddUserArgs, Resolvers } from './generated/graphql'

const Resolvers: Resolvers = {
    Query: {
        getAllUsers: async () => {
            const rows = await Knex('users').select('*')
            return rows
        }
    },
    Mutation: {
        addUser: async (_: unknown, user: MutationAddUserArgs) => {
            const rows = await Knex('users').insert(user, '*')
            return rows[0]
        }
    }
}

export default Resolvers
