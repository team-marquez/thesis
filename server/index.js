const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const nlu = require('../discovery.js')

const app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(express.static(__dirname + '/../client/dist/'))

app.get('/', (req, res) => {
  res.send('server working')
})

app.get('/test', (req, res) => {
  nlu.analyze(
    {
      html:
        'In a city where space is at a premium, there remains hidden away a lush garden of solitude, known to only a very few. Remarkably, this pleasant, quiet meadow can be found in the jostling streets of the busy Financial District in Lower Manhattan. Or more specifically, above it! The Elevated Acre is precisely that: a one - acre meadow flanked by delightfully designed gardens and plantings elevated above the city streets.Its entrance is fairly anonymous, an escalator at 55 Water Street, set back from the sidewalk.Currently surrounded by construction, passersby will often overlook it.But if you venture up the escalators you will find the marvelous Elevated Acre. The secretive urban oasis features a lawn, an amphitheater, a summer beer garden, winding paths of Brazilian hardwood, spectacular views of the East River, Brooklyn, and the Brooklyn Bridge, and above all, pleasant solitude.This elevated one - acre park is one of Manhattan’s most relaxing secrets.', // Buffer or String
      features: {
        keywords: {}
      }
    },
    function(err, response) {
      if (err) {
        console.error('Error with NLU:', err)
      } else {
        res.send(response)
      }
    }
  )
})

app.listen(5000, () => {
  console.log('Listening on port 5000')
})
