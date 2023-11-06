import pool from './database'

const Resolvers = {
    Query: {
        getAllUsers: async () => {
            const { rows } = await pool.query('SELECT * from users')
            return rows
        }
    },
    Mutation: {
        addUser: async (_: unknown, { email }: { email: string }) => {
            const { rows } = await pool.query(
                'INSERT INTO users (email) VALUES ($1) RETURNING email',
                [email]
            )
            return rows[0]
        }
    }
}

export default Resolvers
