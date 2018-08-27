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
const fs = require('fs')
const recombee = require('recombee-api-client')
const rqs = recombee.requests

const client = new recombee.ApiClient('hack-reactor', 'KiTAOmy8RdNPzSZgspvDzVxivkFcsTxXtRA284YbtlyLUZvdoyq1UjVN2sFZhnCD')
const prisma = new Prisma({
  typeDefs: path.join(__dirname, 'generated/prisma.graphql'),
  endpoint: 'http://34.234.236.21:4466'
})

let restaurants = null
let activities = null

prisma.query
  .restaurants(
    {},
    '{id, name,  image,  cuisine,  cost,   description,  location,  source, website,  mealtime, local_tourist }'
  )
  .then(e => {
    console.log('restaurants queried')
    restaurants = e
    restaurants.forEach(elem => (elem['type'] = ['restaurant']))
  })

prisma.query
  .activities(
    {},
    '{id, name,description, cost, image, location,source, website, local_tourist,indoor_outdoor,concepts,categories,child_friendly,}'
  )
  .then(e => {
    console.log('activities queried')
    activities = e
    activities.forEach(elem => (elem['type'] = ['activity']))
  })

const resolvers = {
  Query: {
    userPrefs: async (_, pref, context, info) => {
      let {userId} = pref.pref;
      if (userId !== 'anon'){
        console.log('logged in paths')
        try {
        var recs = await recommendation.getRecs(userId)
        recs = shuffle(recs.concat(restaurants), {copy: true})
      } catch (e){
        console.error(e)
      }
      } else {
        console.log('anon paths')
        var recs = restaurants.concat(activities)
        recs = shuffle(recs, { copy: true })
      }
      test = await weather.weatherBoi(pref)
      recs2 = budget.budgetBoi(recs, test)
      test = assembly.assemblyBoi(recs2, test)
      return JSON.stringify(test, null, 2)
    },
    userRecs: (_, { id }, context, info) => {
      return recommendation.getRecs(id)
    },
    food: (a, { cost }, c, d) => {
      return c.db.query.restaurants({ where: { cost: cost } }, d)
    },
    weather: (a, { date }, c, d) => {
      return c.db.query.weather({ where: { day: date } }, d)
    },
    firebaseUser: (_, { firebaseId }, context, info) => {
      return context.db.query.users({ where: { firebaseId } }, info)
    }
  },
  Mutation: {
    createUsers: async (
      _,
      { username, password, firebaseId },
      context,
      info
    ) => {
      const creation = await context.db.mutation.createUsers(
        {
          data: {
            username,
            password,
            firebaseId
          }
        },
        info
      )

      client.send(new rqs.AddUser(creation.id)).then(() => {
        console.log('Created Recombee user')
        return creation
      })

      return creation
    },
    updateUsers: (_, { id, trips }, context, info) => {
      console.log('Updated trips for user', id)

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
