const { Prisma } = require('prisma-binding')

module.exports = {
  weatherBoi: clientPreferences => {
    const moment = require('moment')
    let userTripDates = clientPreferences.pref.tripDates

    //handle the mutation of the date range
    if (!Array.isArray(userTripDates)) {
      let start = userTripDates.startDate.split('T')[0]
      let end = userTripDates.endDate.split('T')[0]
      let dates = [start]

      let current = start

      while (current !== end) {
        current = moment(current)
          .add(1, 'd')
          .format('YYYY-MM-DD')
        dates.push(current)
      }

      clientPreferences.pref.tripDates = dates
    }

    let weather = []

    const query = `
      query weathers($day: String!) {
        weathers(
          where: {
            day: $day
          }) {
            info
          }
      }
    `

    clientPreferences.pref.tripDates.forEach(date => {
      prisma.query
        .weathers(
          {
            where: {
              day: date
            }
          },
          '{avg_temp, min_temp, max_temp, snow, rain}'
        )
        .then(({ avg_temp, min_temp, max_temp, rain }) => {
          var container = {
            avg_temp,
            min_temp,
            max_temp
          }

          if (rain >= 70) {
            container.rain = 1
            container.rain_chance = rain
          } else {
            container.rain = 0
            container.rain_chance = 0
          }

          weather.push(container)
        })
        .catch(err => console.error('Error fetching weather', err))
    })

    clientPreferences.weather = weather.slice()

    return clientPreferences
  }
}
