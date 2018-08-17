const { GraphQLServer } = require('graphql-yoga')
const { Prisma } = require('prisma-binding')
const express = require('express')
const fs = require("fs");
const fsPromises = fs.promises;
const path = require('path')
const shuffle = require('shuffle-array')

let stuff = ["this", "actually", "worked", "wow"]

const resolvers = {
  Query: {
    MVP: async (_, args, context, info) => {
      let filehandle = await fsPromises.open('./data.json','r+')
      let unparsed = await filehandle.readFile('utf8')
      let parsed = JSON.parse(unparsed)
      let random = shuffle(parsed , { 'copy': true })
      console.log(random.slice(0,30))
      filehandle.close()
      //send to assembly boi or pick random stuff?
      
    },
    activities: (a, {IO},c,d) => {
      console.log(c.db.query)
      return c.db.query.activity({where: {indoor_outdoor: IO}}, d)
      // readFile
    },
    food: (a, {cost},c,d) => {
      return c.db.query.restaurants({where: {cost: cost}}, d)
      // return c.db.query.restaurants()
    },
    weather: (a, {day},c,d) => {
      console.log(d)
      return c.db.query.weather({where: {day: day}}, d)
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
