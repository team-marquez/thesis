const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const express = require('express')
const path = require('path')
const assembly = require('./bois/assembly_boi.js')
const weather = require('./bois/weather_boi.js')
const integrity = require('./bois/integrity_boi.js')
const budget = require('./bois/budget_boi.js')
let rec = require('../../spec/randomrecs')

const resolvers = {
  Query: {
    userPrefs: async (_, pref, context, info) => {
      let recs = await rec.test()

      test = await weather.weatherBoi(pref)
      test = assembly.assemblyBoi(recs, test)
      return JSON.stringify(test, null, 2)
    },
    // activities: (a, { IO }, c, d) => {
    //   console.log(c.db.query)
    //   return c.db.query.activity({ where: { indoor_outdoor: IO } }, d)
    // },
    food: (a, { cost }, c, d) => {
      return c.db.query.restaurants({ where: { cost: cost } }, d)
      // return c.db.query.restaurants()
    },
    weather: (a, { date }, c, d) => {
      return c.db.query.weather({ where: { day: date } }, d)
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
      endpoint: 'http://34.234.236.21:4466', // the endpoint of the Prisma API
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
