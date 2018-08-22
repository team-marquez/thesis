const recombee = require('recombee-api-client')
const rqs = recombee.requests

const client = new recombee.ApiClient(
  'hack-reactor',
  process.env.RECOMBEE_KEY
)

module.exports = {
  getRecs: userId => {
    client.send(new rqs.RecommendItemsToUser(userId), 25).then(response => {
      return response
    })
  },
  updateRecs: (userId, trips) => {
    trips.forEach(element => {
      client.send(userId, element.id).then(() => {
        console.log('Updated recommendation for', element.id)
      })
    })
  }
}
