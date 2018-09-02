const { weatherBoi } = require('./../server/src/bois/weather_boi')
const expect = require('chai').expect
const { weatherClientPreferances } = require('./dummyData')

describe('WeatherBoi', () => {
  let output = weatherBoi(weatherClientPreferances)
  
  describe('date manipulation', () => {
    it('should alter the object of dates into an array', () => {
      expect(Array.isArray(output.pref.tripDates)).to.equal(true)
    })
    
    it('should have an array of length 3 for a three day trip', () => {
      expect(output.pref.tripDates.length).to.equal(3)
    })
    
    it('should be able to handle dates between months', () => {
      let newCP = {pref: {tripDates: {startDate: '2018-11-30T000', endDate: '2018-12-02T000'}}}
      let month = weatherBoi(newCP)
      
      expect(month.pref.tripDates[2]).to.not.equal('Invalid date')
    })

    it('should format the dates as YYYY-MM-DD', () => {
      expect(output.pref.tripDates[0]).to.equal('2018-11-14')
    })
  })

  describe('rain array', () => {
    it('should add a rain array as a property to the CP', () => {
      expect(output.hasOwnProperty('rainArray')).to.equal(true)
    })

    it('should have a value for every day of the trip', () => {
      expect(output.rainArray.length).to.equal(output.pref.tripDates.length)
    })
    
    it('should be populated with 0\'s or 1\'s', () => {
      output.rainArray.forEach((date) => {
        expect([0, 1].includes(date)).to.equal(true)
      })
    })
    
    describe('temp array', () => {
      it('should add a temperature array as a property to the CP', () => {
        expect(output.hasOwnProperty('temperatureArray')).to.equal(true)
      })
      
      it('should have a value for every day of the trip', () => {
        expect(output.temperatureArray.length).to.equal(output.pref.tripDates.length)
      })

    })
  })
})




