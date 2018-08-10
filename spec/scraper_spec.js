const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)
const expect = chai.expect
const { scrape, search_url } = require('./../scraper.js')

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