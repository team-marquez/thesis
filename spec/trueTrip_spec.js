const expect = require('chai').expect
const { clientPreferances, recsData } = require('./dummyData.js')
const { assemblyBoi } = require('./../server/src/bois/assembly_boi.js')

describe('trueTripOption from AssemblyBoi', () => {
    let output = assemblyBoi(recsData, clientPreferances)

    it('should have itinerary, rainArray, rainyActs, tripDates, and tempArray properties', () => {
        expect(output.hasOwnProperty('itinerary')).to.equal(true)
        expect(output.hasOwnProperty('rainArray')).to.equal(true)
        expect(output.hasOwnProperty('temperatureArray')).to.equal(true)
        expect(output.hasOwnProperty('tripDates')).to.equal(true)
        expect(output.hasOwnProperty('rainyActs')).to.equal(true)
    })

    it('should have an itinerary for each day of the trip', () => {
        expect(output.itinerary.length).to.equal(output.tripDates.length)
    })

    it('should 6 items in each day\'s array', () => {
        output.itinerary.forEach((day) => {
            expect(day.length).to.equal(6)
        })
    })
})