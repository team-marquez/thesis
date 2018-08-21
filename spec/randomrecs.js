const fs = require('fs')
const shuffle = require('shuffle-array')
const path = require('path')
const DIR = path.join(__dirname, '../data.json')

module.exports = {
  test: async () => {
    let filehandle = await fs.readFileSync(DIR)
    let parsed = JSON.parse(filehandle)
    let random = shuffle(parsed, { copy: true })
    filehandle.close
    return random
  }
}
