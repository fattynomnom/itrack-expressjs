/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('transactions', table => {
        table.string('uid').primary()
        table.string('name').notNullable()
        table.decimal('amount').notNullable()
        table.date('date').notNullable()
        table.string('category_uid').notNullable()
        table.foreign('category_uid').references('uid').inTable('categories')
        table.string('user_email').notNullable()
        table.foreign('user_email').references('email').inTable('users')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('transactions')
};
