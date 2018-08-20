//service.js.
const moment = require('moment')
const test = JSON.parse("{\"totalBudget\":\"3000\",\"partySize\":\"2\",\"tripDates\":{\"startDate\":\"2018-08-15T04:00:00.000Z\", \"endDate\":\"2018-08-19T03:59:59.999Z\"},\"LT\":78,\"IO\":10,\"FA\":79,\"kidFriendly\":false}")

test //?
let fixdates = (trip) => {
  let start = trip.startDate.split('T')[0] //?
  let end = trip.endDate.split('T')[0] //?
  let dates = [start]
  let current = start
  while (current !== end) {
    current = moment(current).add(1, 'd').format('YYYY-MM-DD')
    dates.push(current)
  }
  return dates
}
test.tripDates = fixdates(test.tripDates) //?
 
let queryActivities = (prefs) => {
  let days = prefs['tripDates'].length //?
  let IO = prefs.IO / 100 //?
  let indoorActivitiesTotal = Math.round((days * 3) * IO) //?
  let outdoorActivitiesTotal = (days * 3) - indoorActivitiesTotal //?

}

queryActivities(test) 

//func (userPrefs)
//round all the values
// restaurant = gql`{
//   food(cost: 0){
//     name
//     image
//     description
//     why_go
//     website
//   }
// }`


