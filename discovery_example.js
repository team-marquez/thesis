const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js')

const nlu = new NaturalLanguageUnderstandingV1({
  url: 'https://gateway.watsonplatform.net/natural-language-understanding/api/',
  version: '2018-04-05',
  iam_apikey: __key__
})

module.exports = nlu
