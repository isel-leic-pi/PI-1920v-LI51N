
const PORT = 1904

const express = require('express')
const url = require('url')

const db = require('./it-db')()
const services = require('./it-services')(db)

const webApiRouter = require('./it-web-api')(services)

const app = express()

app.use(express.json())

app.use('/it/api', webApiRouter)

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))



