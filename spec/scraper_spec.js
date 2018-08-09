const expect = require('chai').expect
const { scrape, search_url } = require('./../scraper.js')

describe('Scraper', () => {
    describe('Structure', () => {
        let scrapedData = scrape(search_url)
        // console.log(scrapedData)
        it('should be an Array', () => {
            return expect(typeof scrapedData).to.eventually.equal('Array')
        })

        it('should have a length greater than 0', () => {
            return expect(scrapedData.length).to.be.eventually.greaterThan(0)
        })

        it('should have a valid description', () => {
            return expect(typeof scrapedData[0].description).to.eventually.equal('string')
            return expect(scrapedData[0].description.length).to.eventually.be.greaterThan(0)
        })

    })
})