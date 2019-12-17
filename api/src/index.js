const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')

const Query = require('./resolvers/Query')
const Mutation = require('./resolvers/Mutation')
const User = require('./resolvers/User')
const Link = require('./resolvers/Link')
const Subscription = require('./resolvers/Subscription')
const Vote = require('./resolvers/Vote')

//The 'resolvers' object is the actual implementation of the schema
const resolvers = {
   Query,
   Mutation,
   User,
   Link,
   Subscription,
   Vote
}


//The server requires a schema and resolvers.
//This tells the server what API operations are accepted and how they are resolved.
const server = new GraphQLServer({
    //'typeDefs' defines the GraphQL schema.
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => {
        return {
            ...request,
            prisma
        }
    }
})

//Context is an object that gets passed through the resolver chain and every resolver can read from or write to.

server.start(() => console.log(`Server is running on port 4000`))