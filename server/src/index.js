const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const express = require('express')
const path = require('path')

let stuff = ["this", "actually", "worked", "wow"]

const resolvers = {
  Query: {
    users: (_, args, context, info) => {
<<<<<<< HEAD
      // console.log(`info: ${Object.keys(context.db)}
      // `)
      return context.db.query.users
    },
    food: (_, args, context, info) => {
      // console.log(`info: ${Object.keys(context.db)}
      // `)
      return context.db.query.users
    },
    echo: (a, { args }, b, c) => {
      return args
    },
    test: (a, { args }, b, c) => {
      console.log(args)
      return args
    },
    userPrefs: (a, { args }, b, c) => {
      console.log(args)
=======
      return context.db.query.users
    },
    echo: (a, { args }, b, c) => {
>>>>>>> dev
      return args
    }
  },

  Mutation: {
    createUsers: (_, { username, password, age, gender }, context, info) => {
      return context.db.mutation.createUsers(
        {
          data: {
            username,
            password,
            age,
            gender
          }
        },
        info
      )
    },
    createWeather: (
      _,
      { day, temperature, low_uncertainty, high_uncertainty },
      context,
      info
    ) => {
      return context.db.mutation.createWeather(
        {
          data: {
            day,
            temperature,
            low_uncertainty,
            high_uncertainty
          }
        },
        info
      )
    },
    createRestaurant: (
      _,
      {
        name,
        image,
        cuisine,
        cost,
        description,
        why_go,
        location,
        source,
        website
      },
      context,
      info
    ) => {
      return context.db.mutation.createRestaurant(
        {
          data: {
            name,
            image,
            cuisine,
            cost,
            description,
            why_go,
            location,
            source,
            website
          }
        },
        info
      )
    }
  }
}

const server = new GraphQLServer({
  typeDefs: path.join(__dirname, '/schema.graphql'),
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: path.join(__dirname, '/generated/prisma.graphql'), // the auto-generated GraphQL schema of the Prisma API
      endpoint: 'http://localhost:4466/', // the endpoint of the Prisma API
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
  playground: '/playground'
}

server.start(options, ({ port }) =>
  console.log('Server is running on http://localhost:' + port)
)
