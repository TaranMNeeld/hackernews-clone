const { GraphQLServer } = require('graphql-yoga')

// The 'links' variable is used to store the links at runtime.
// For now, everything is stored only in-memory rather than being persisted in a database.
let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
]

let idCount = links.length;

//The 'resolvers' object is the actual implementation of the schema
const resolvers = {
    //Each field in the application schema is represented by a function with the same name
    Query: {
        info: () => `This is the API of Taran Neeld's Hackernews Clone! :p`,
        feed: () => links,
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url
    }
}

//The server requires a schema and resolvers.
//This tells the server what API operations are accepted and how they are resolved.
const server = new GraphQLServer({
    //'typeDefs' defines the GraphQL schema.
    typeDefs: './src/schema.graphql',
    resolvers
})

//Context is an object that gets passed through the resolver chain and every resolver can read from or write to.

server.start(() => console.log(`Server is running on port 4000`))