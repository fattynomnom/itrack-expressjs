import { User } from './generated/graphql'

export interface ApolloContext {
    user: Partial<User>
}
