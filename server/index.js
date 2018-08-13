const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const { ApolloServer, gql } = require('apollo-server-express');
var { buildSchema } = require('graphql');

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
var typeDefs = gql`
    type Query {
      globalQuery (request: String!): String
    }
`
const resolvers = {
  Query: {
    //TODO:
    //Check for integrity 
    //Send this to the database
    //Then filter through the appropiate services
    globalQuery: (a, {request}, c,d) => console.log(request),
  }
}


const app = express()
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });
app.use(morgan('dev'))
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist/'))

app.listen({ port: 5000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);
