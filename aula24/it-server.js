const PORT = 1904

const express = require('express')
const url = require('url')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')

const db = require('./it-db-es')()
const services = require('./it-services')(db)

const webApiRouter = require('./it-web-api')(services)

const app = express()



app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('./public'))

app.use(addLoginInformation)
app.use('/it/api', webApiRouter)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

app.use(logErrors)


app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))


function logErrors (err, req, res, next) {
  console.error("Error logger: ", err)
  next(err)
}


function addLoginInformation(req, rsp, next) {
  const user = req.cookies["Auth"];
  if(user) {
    console.log(`User authenticated ${user}`)
  } else {
    console.log(`User NOT authenticated`)
  }
  req.user = user
  next()

}




