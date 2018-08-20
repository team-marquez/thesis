const fs = require("fs")
const shuffle = require("shuffle-array")

module.exports = {
  test: async () => {
    let filehandle = await fs.readFileSync("./data.json")
    let parsed = JSON.parse(filehandle)
    let random = shuffle(parsed, { copy: true })
    filehandle.close
    return random
  }
}
