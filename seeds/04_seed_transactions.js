/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
    const [user] = await knex('users').select().limit(1)
    const [category] = await knex('categories')
        .select()
        .where({ user_email: user.email })
        .limit(1)

    await knex('transactions').del()
    await knex('transactions').insert([
        {
            uid: crypto.randomUUID(),
            name: 'Electricity bill',
            amount: 150.00,
            date: new Date(),
            category_uid: category.uid,
            user_email: user.email
        }
    ])
}
