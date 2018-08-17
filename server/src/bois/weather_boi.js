module.exports = {
  weatherBoi: (clientPreferences) => {
    const moment = require('moment')
    let userTripDates = clientPreferences.pref.tripDates


    //handle the mutation of the date range
    if (!Array.isArray(userTripDates)) {
      let start = userTripDates.startDate.split('T')[0]
      let end = userTripDates.endDate.split('T')[0]
      let dates = [start]

      let current = start
  
      while (current !== end) {
        current = moment(current).add(1, 'd').format('YYYY-MM-DD')
        dates.push(current)
      }

      clientPreferences.pref.tripDates = dates
    }

    let rainArray = []
    let tempArray = []

    //dummy function until Erik finishes the weather Lookup function
    const weatherLookup = (lookupDate) => {
      return Math.round(Math.random() -.2)
    }
    //dummy function till we integrate the weather temp prediction
    const tempLookup = (lookupDate) => {
      return Math.round(Math.random() * 100)
    }

    clientPreferences.pref.tripDates.forEach((date) => {
      rainArray.push(weatherLookup(date))
      tempArray.push(tempLookup(date))
    })

    clientPreferences.rainArray = rainArray.slice()
    clientPreferences.temperatureArray = tempArray.slice()

    return clientPreferences
  }
}


