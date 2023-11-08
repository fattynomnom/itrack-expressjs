import dotenv from 'dotenv'
import knex from 'knex'

dotenv.config()

const Knex = knex({
    client: 'pg',
    connection: {
        user: process.env.POSTGRESQL_USER,
        password: process.env.POSTGRESQL_PW,
        host: process.env.POSTGRESQL_HOST,
        port: Number(process.env.POSTGRESQL_PORT),
        database: process.env.POSTGRESQL_DB
    }
})

export default Knex
