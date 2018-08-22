const recombee = require('recombee-api-client')
const rqs = recombee.requests

const client = new recombee.ApiClient('hack-reactor', 'KiTAOmy8RdNPzSZgspvDzVxivkFcsTxXtRA284YbtlyLUZvdoyq1UjVN2sFZhnCD')

module.exports = {
  getRecs: userId => {
    client
      .send(new rqs.RecommendItemsToUser(userId), 25)
      .then(response => {
        return response
      })
      .catch(err => {
        console.error('Error getting recommendations', err)
      })
  },
  updateRecs: (userId, trips) => {
    trips.forEach(element => {
      client
        .send(userId, element.id)
        .then(() => {
          console.log('Updated recommendation for', element.id)
        })
        .catch(err => {
          console.error('Error updating recommendations', err)
        })
    })
  }
}
