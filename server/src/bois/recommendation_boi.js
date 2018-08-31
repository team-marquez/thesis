const recombee = require("recombee-api-client")
const rqs = recombee.requests
const { Prisma } = require("prisma-binding")
const path = require("path")

const prisma = new Prisma({
  typeDefs: path.join(__dirname, "../generated/prisma.graphql"),
  endpoint: "http://34.234.236.21:4466"
})

const client = new recombee.ApiClient(
  'testing-server',
  '__key__'
)

module.exports = {
  getRecs: async userId => {
    let {recomms} = await client.send(new rqs.RecommendItemsToUser(userId, 25))
    let q = recomms.map(async act => {
      let data = await prisma.query.activities(
        { where: { id: act.id } },
        "{id, name,description, cost, image, location,source, website, local_tourist,indoor_outdoor,concepts,categories,child_friendly,}"
      )
      data = data[0]
      data["type"] = ["activity"]
      return data
    })
    return Promise.all(q)
  },
  updateRecs: (userId, trips) => {
    trips.forEach(element => {
      console.log(JSON.stringify(element.id))

      client
        .send(new rqs.AddPurchase(userId, element.id))
        .then(() => {
          console.log("Updated recommendation for", element.id)
        })
        .catch(err => {
          console.error("Error updating recommendations", err)
        })
    })
  }
}
