const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const express =  require('express')
const path = require('path')

/*
var typeDefs = gql`
    type Query {
      globalQuery(
        budget {
          alloc: String
          amount: String
          food: String
          activities: String
        }
        in_out: String
        local_tourist: String
        food_activity: String
        NSFW: String
        days: String
        travelers: String
      )
    }
`;
*/
// var typeDefs = gql`
//   type Query {
//     globalQuery(request: String!): String
//   }
// `

const resolvers = {
  Query: {
    users: (_, args, context, info) => {
      console.log(`info: ${Object.keys(context.db)}
      `)
      return context.prisma.query.users
    },
    echo: (a, {args}, b , c) => {
      console.log(args)
      return args
    }
    },
    Mutation: {
      createUsers: (a,b,c,d) => console.log(`${JSON.stringify(Object.keys(c.response.output))}`)
    }
}

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, '/schema.graphql'),
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: path.join(__dirname, '/generated/prisma.graphql'), // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'http://localhost:4466/graphql', // the endpoint of the Prisma API
      debug: true // log all GraphQL queries & mutations sent to the Prisma API
      // secret: 'mysecret123', // only needed if specified in `database/prisma.yml`
    })
  })
})
server.express.use(express.static(__dirname + '/../../client/dist/'))

const options = {
  port: 4000,
  endpoint: '/graphql',
  subscriptions: '/subscriptions',
  playground: '/playground',
}
server.start(options, ({port}) => console.log('Server is running on http://localhost:'+ port))