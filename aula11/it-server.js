const PORT = 1904

const express = require('express')
const url = require('url')
const morgan = require('morgan')

const requestMeasure = require('./chelas-request-time.js')({start: true, end: true, duration: true })

const db = require('./it-db')()
const services = require('./it-services')(db)

const webApiRouter = require('./it-web-api')(services)

const app = express()



app.use(morgan('dev'))
app.use(requestMeasure)
app.use(express.json())
app.use('/files/', express.static('./public'))
app.use('/it/api', webApiRouter)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(logErrors)
app.use(myErrorMw)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))


function logErrors (err, req, res, next) {
  console.error("Error logger: ", err)
  next(err)
}


function myErrorMw(err, req, res, next) {
  console.log("Error")
  console.error(err.stack)
  res.status(500).send('Something broke!')
}


