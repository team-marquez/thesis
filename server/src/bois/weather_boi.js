const { Prisma } = require("prisma-binding");
const path = require("path");

const prisma = new Prisma({
  typeDefs: path.join(__dirname, "../generated/prisma.graphql"),
  endpoint: "http://34.234.236.21:4466"
});

module.exports = {
  weatherBoi: async clientPreferences => {
    const moment = require("moment");
    let userTripDates = clientPreferences.pref.tripDates;

    //handle the mutation of the date range, changing it from a start and date to an array
    //of dates formatted YYYY-MM-DD
    if (!Array.isArray(userTripDates)) {
      let start = userTripDates.startDate.split("T")[0];
      let end = userTripDates.endDate.split("T")[0];
      let dates = [start];

      let current = start;

      while (current !== end) {
        current = moment(current)
          .add(1, "d")
          .format("YYYY-MM-DD");
        dates.push(current);
      }

      clientPreferences.pref.tripDates = dates;
    }

    let weather = [];

    const query = `
      query weathers($day: String!) {
        weathers(
          where: {
            day: $day
          }) {
            info
          }
      }
    `;

    //retrieves items about the weather from the database
    await new Promise((resolve, reject) => {
      clientPreferences.pref.tripDates.forEach(date => {
        prisma.query
          .weathers(
            {
              where: {
                day: date
              }
            },
            "{avg_temp, min_temp, max_temp, snow, rain}"
          )
          .then(response => {
            var { avg_temp, min_temp, max_temp, rain } = response[0];

            var container = {
              avg_temp,
              min_temp,
              max_temp
            };

            //we consider a 70% chance of rain enough to say that there will be rain that day
            //otherwise we call the weather clear
            if (rain >= 70) {
              container.rain = 1;
              container.rain_chance = rain;
            } else {
              container.rain = 0;
              container.rain_chance = 0;
            }

            weather.push(container);
          })
          .catch(err => console.error("Error fetching weather", err))
          .then(() => resolve());
      });
    });

    clientPreferences.weather = weather;
    return clientPreferences;
  }
};
