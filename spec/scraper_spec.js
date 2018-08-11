const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const { scrape, search_url, scrapeIndividualPage } = require('./../scraper.js')
const axios = require('axios')

describe('Scraper', () => {
    describe('Structure', () => {
        it('should be an Array', () => {
            scrape(search_url).then((scrapedData) => {
                expect(typeof scrapedData).to.equal('Array')
            })
        })

        it('should have a length greater than 0', () => {
            scrape(search_url).then((scrapedData) => {
                expect(scrapedData.length).to.be.greaterThan(0)
            })
        })

        it('should have a valid string description', () => {
            scrape(search_url).then((scrapedData) => {
                expect(typeof scrapedData[0].description).to.equal('string')
            })
        })

        it('should have a description', () => {
            scrape(search_url).then((scrapedData) => {
                expect(scrapedData[0].description.length).to.be.greaterThan(0)
            })
        })

    })
})

describe('Individual Page Scraper', () => {
    describe('Structure', () => {
        let individualPageURL = 'https://www.atlasobscura.com/places/'
        let individualName = 'explorers club headquarters'
        let dashedName = individualName.split(' ').join('-')

        it('should have a valid Atlas Obscura website', () => {
            axios.get(individualPageURL + dashedName).then((response) => {
                expect(response.data).to.not.equal(404)
            })
        })

        it('should have 5 keys', () => {
            scrapeIndividualPage(individualPageURL, individualName).then((response) => {
                expect(Object.keys(response).length).to.equal(5)
            })
        })

        it('should have a valid website url', () => {
            scrapeIndividualPage(individualPageURL, individualName).then((response) => {
                expect(response.website).to.not.be(undefined)
            })
        })
    })
})