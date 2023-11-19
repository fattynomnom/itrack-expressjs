/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('categories', table => {
        table.string('uid').primary()
        table.string('name').notNullable()
        table.enu('type', ['expense', 'income'])
        table.string('color').notNullable()
        table.string('user_email').notNullable()
        table.foreign('user_email').references('email').inTable('users')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories')
};
