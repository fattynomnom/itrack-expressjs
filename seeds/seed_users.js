/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    await knex('users').del()
    await knex('users').insert([
        { email: 'mail1@mail.com' },
        { email: 'mail2@mail.com' },
        { email: 'mail3@mail.com' }
    ])
}
