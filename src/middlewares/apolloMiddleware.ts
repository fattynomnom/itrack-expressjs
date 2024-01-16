import { authenticateMachineResolver } from './apollo/authenticateMachine'
import { authenticateUserResolver } from './apollo/authenticateUser'

const ApolloMiddleware = {
    Query: {
        getTransactions: authenticateUserResolver
    },
    Mutation: {
        addTransaction: authenticateUserResolver,
        addUser: authenticateMachineResolver
    }
}

export default ApolloMiddleware
