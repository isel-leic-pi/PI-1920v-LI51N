const PORT = 1904

const express = require('express')
const url = require('url')
const morgan = require('morgan')

const db = require('./it-db')()
const services = require('./it-services')(db)

const webApiRouter = require('./it-web-api')(services)

const app = express()

app.use(morgan('dev'))
app.use(requestMeasure)
app.use(express.json())

app.use('/it/api', mw2)
app.use(mw1)

app.use('/it/api', webApiRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))


function mw1(req, rsp, next) {
  console.log('mw1 was called')
  next()
}

function mw2(req, rsp, next) {
  console.log('mw2 was called')
  next()
}


function requestMeasure(req, rsp, next) {
  const start = Date.now()
  rsp.on('finish', endRequest)
  next()

  function endRequest() {
    const end = Date.now()
    console.log(`Request took ${end-start} ms`)
  }

}



