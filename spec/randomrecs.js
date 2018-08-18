
const fs = require("fs");
const fsPromises = fs.promises;
const shuffle = require("shuffle-array");

module.exports = {
test: async () => {
let filehandle = await fsPromises.open("./data.json", "r+")
let unparsed = await filehandle.readFile("utf8")
let parsed = JSON.parse(unparsed)
let random = shuffle(parsed, { copy: true })
filehandle.close
return random
}
}
