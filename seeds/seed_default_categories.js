/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
    await knex('default_categories').del()
    await knex('default_categories').insert([
        { uid: crypto.randomUUID(), name: 'Income', type: 'income', color: 'green' },
        { uid: crypto.randomUUID(), name: 'Food', type: 'expense', color: 'orange' },
        { uid: crypto.randomUUID(), name: 'Housing', type: 'expense', color: 'yellow' },
        { uid: crypto.randomUUID(), name: 'Fitness', type: 'expense', color: 'lime' },
        { uid: crypto.randomUUID(), name: 'Hobby', type: 'expense', color: 'blue' },
        { uid: crypto.randomUUID(), name: 'Entertainment', type: 'expense', color: 'indigo' },
        { uid: crypto.randomUUID(), name: 'Pet', type: 'expense', color: 'fuchsia' },
        { uid: crypto.randomUUID(), name: 'Necessities', type: 'expense', color: 'rose' },
        { uid: crypto.randomUUID(), name: 'Medical', type: 'expense', color: 'orange' },
        { uid: crypto.randomUUID(), name: 'Transportation', type: 'expense', color: 'yellow' },
        { uid: crypto.randomUUID(), name: 'Car', type: 'expense', color: 'lime' },
        { uid: crypto.randomUUID(), name: 'Electronics', type: 'expense', color: 'blue' },
        { uid: crypto.randomUUID(), name: 'Shopping', type: 'expense', color: 'indigo' },
    ]);
};
