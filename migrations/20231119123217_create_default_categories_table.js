/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('default_categories', table => {
        table.string('uid').primary()
        table.string('name').notNullable()
        table.enu('type', ['expense', 'income'])
        table.string('color').notNullable()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('default_categories')
};
