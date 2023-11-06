require('dotenv').config()

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'pg',
        connection: {
            user: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PW,
            host: process.env.POSTGRESQL_HOST,
            port: process.env.POSTGRESQL_PORT,
            database: process.env.POSTGRESQL_DB
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            user: process.env.POSTGRESQL_USER,
            password: process.env.POSTGRESQL_PW,
            host: process.env.POSTGRESQL_HOST,
            port: process.env.POSTGRESQL_PORT,
            database: process.env.POSTGRESQL_DB
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
}
