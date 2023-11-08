import Knex from './database'
import { User } from './models'

const Resolvers = {
    Query: {
        getAllUsers: async () => {
            const rows = await Knex('users').select('*')
            return rows
        }
    },
    Mutation: {
        addUser: async (_: unknown, user: User) => {
            const rows = await Knex('users').insert(user, '*')
            return rows[0]
        }
    }
}

export default Resolvers
