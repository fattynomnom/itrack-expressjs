import { GraphQLError } from 'graphql'
import Knex from './database'
import {
    Category,
    DefaultCategory,
    MutationAddTransactionArgs,
    MutationAddUserArgs,
    Resolvers
} from './generated/graphql'
import crypto from 'crypto'
import { ApolloContext } from './middlewares/setApolloContext'

const Resolvers: Resolvers = {
    Query: {
        getAllUsers: async (
            _parent: unknown,
            _args: unknown,
            context: ApolloContext
        ) => {
            console.log(3, context)
            const rows = await Knex('users').select('*')
            return rows
        },
        getTransactions: async (
            _parent: unknown,
            _args: unknown,
            { user }: ApolloContext
        ) => {
            const rows = await Knex('transactions').select('*').where({
                user_email: user.email
            })

            return rows
        }
    },
    Mutation: {
        addUser: async (_: unknown, { email }: MutationAddUserArgs) => {
            const defaultCategories =
                await Knex.select().from<DefaultCategory>('default_categories')
            const [users, categories] = await Promise.all([
                Knex('users').insert({ email }, '*'),
                Knex('categories').insert(
                    defaultCategories.map(category => ({
                        uid: crypto.randomUUID(),
                        name: category.name,
                        type: category.type,
                        color: category.color,
                        user_email: email
                    })),
                    '*'
                )
            ])

            return {
                ...users[0],
                categories
            }
        },
        addTransaction: async (
            _: unknown,
            { transaction }: MutationAddTransactionArgs,
            { user }: ApolloContext
        ) => {
            const categories = await Knex.select()
                .from<Category>('categories')
                .where({ uid: transaction.category_uid })
            if (categories.length === 0) {
                throw new GraphQLError('category_uid not found', {
                    extensions: {
                        code: '404'
                    }
                })
            }

            const transactions = await Knex('transactions').insert(
                {
                    uid: crypto.randomUUID(),
                    name: transaction.name,
                    amount: transaction.amount,
                    date: new Date(),
                    category_uid: transaction.category_uid,
                    user_email: user.email
                },
                '*'
            )

            return {
                ...transactions[0],
                category: categories[0]
            }
        }
    }
}

export default Resolvers
