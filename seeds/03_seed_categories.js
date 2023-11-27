/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    const defaultCategories = await knex('default_categories').select()
    const [user] = await knex('users').select().limit()

    await knex('categories').del()
    await knex('categories').insert(
        defaultCategories.map(category => ({
            ...category,
            uid: crypto.randomUUID(),
            user_email: user.email
        }))
    )
}
