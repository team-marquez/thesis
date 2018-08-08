const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(express.static(__dirname + '/../client/dist/'))

app.get('/', (req, res) => {
  res.send('server working')
})

app.listen(5000, () => {console.log('Listening on port 5000')})
