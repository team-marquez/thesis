const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const express = require('express')
const path = require('path')
const assembly = require('./bois/assembly_boi.js')
const weather = require('./bois/weather_boi.js')
const integrity = require('./bois/integrity_boi.js')
const budget = require('./bois/budget_boi.js')
const recommendation = require('./bois/recommendation_boi.js')
const shuffle = require('shuffle-array')


const recombee = require('recombee-api-client')
const rqs = recombee.requests

const client = new recombee.ApiClient(
  'hack-reactor',
  'KiTAOmy8RdNPzSZgspvDzVxivkFcsTxXtRA284YbtlyLUZvdoyq1UjVN2sFZhnCD'
)
const prisma = new Prisma({
  typeDefs: path.join(__dirname, 'generated/prisma.graphql'),
  endpoint: 'http://34.234.236.21:4466'
})


let restaurants = null
let activities = null

prisma.query.restaurants({},'{id, name,  image,  cuisine,  cost,   description,  location,  source, website,  mealtime, local_tourist }').then(e => {
  console.log('restaurants queried')
  restaurants = e
  restaurants.forEach(elem => elem['type'] = ['restaurant'])
})

prisma.query.activities({},'{id, name,description, cost, image, location,source, website, local_tourist,indoor_outdoor,concepts,categories,child_friendly,}').then(e => {
  console.log('activities queried')
  activities = e
  activities.forEach(elem => elem['type'] = ['activity'])
})

const resolvers = {
  Query: {
    userPrefs: async (_, pref, context, info) => {
      let recs = restaurants.concat(activities)
      recs = shuffle(recs, {copy: true})
      test = await weather.weatherBoi(pref)
      test = assembly.assemblyBoi(recs, test)
      return JSON.stringify(test, null, 2)
    },
    userRecs: (_, { id }, context, info) => {
      return recommendation.getRecs(id)
    },
    food: (a, { cost }, c, d) => {
      return c.db.query.restaurants({ where: { cost: cost } }, d)
      // return c.db.query.restaurants()
    },
    weather: (a, { date }, c, d) => {
      return c.db.query.weather({ where: { day: date } }, d)
    }
  },
  Mutation: {
    createUsers: async (
      _,
      { username, password, age, gender },
      context,
      info
    ) => {
      const creation = await context.db.mutation.createUsers(
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

      client.send(new rqs.AddUser(creation.id)).then(() => {
        return creation
      })
    },
    updateUsers: (_, { id, trips }, context, info) => {
      trips.forEach(trip => {
        context.db.mutation.updateUsers(
          {
            data: {
              history: {
                create: {
                  details: {
                    connect: {
                      id: trip.id
                    }
                  }
                }
              }
            },
            where: {
              id
            }
          },
          info
        )
      })

      return recommendation.updateRecs(id, trips)
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
