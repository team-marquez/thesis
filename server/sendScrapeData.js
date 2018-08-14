const {
    scrapeTenPages,
    search_url,
    scrapeIndividualPage,
    attractionTimeOutIndividualPageScrape,
    attractionTimeOutListScrape,
    timeOutIndividualPageScrape,
    timeOutListScrape,
    scrapeTenPages
} = require('./../scraper.js')

const { gql } = require('apollo-server')
const { graphql } = require('graphql')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = graphql

const atlasObscuraSmall = new GraphQLObjectType({
    name: 'atlasObscuraSmall',
    fields: {
        create: {
            type: AtlasSmall,
            args: {
                name: {type: GraphQLString},
                description: {type: GraphQLString},
                img: {type: GraphQLString}
            }
        }
    }
})

const timeOutEventLarge = new GraphQLObjectType({
    name: 'timeOutEventLarge',
    fields: {
        create: {
            type: Activity,
            args: {
                
            }
        }
    }
})



// mutation CreateAtlasObscuraSmall($name: Name!)