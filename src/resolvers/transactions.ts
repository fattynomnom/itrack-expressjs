import {
    Category,
    MutationAddTransactionArgs,
    MutationResolvers,
    QueryResolvers,
    Resolvers
} from '../generated/graphql'

import { ApolloContext } from '../middlewares/setApolloContext'
import { GraphQLError } from 'graphql'
import Knex from '../database'
import crypto from 'crypto'

interface TransactionResolvers {
    Query: Pick<QueryResolvers<ApolloContext>, 'getTransactions'>
    Mutation: Pick<MutationResolvers<ApolloContext>, 'addTransaction'>
}

const Resolvers: TransactionResolvers = {
    Query: {
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
