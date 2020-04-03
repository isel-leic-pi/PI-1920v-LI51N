
const PORT = 1904

const http = require('http')
const url = require('url')
const webApi = require('./it-web-api')

const server = http.createServer(processHttpRequests)

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`))




function processHttpRequests(req, rsp) {
  const reqUrl = url.parse(req.url)
  console.log("###" + reqUrl.pathname)


  // HORROR: The following code  is simply horrendous!!!!!
  if (req.method == "GET") {
    if (reqUrl.pathname == "/it/api/issues") {
      return webApi.getIssues(req, rsp)
    }
    if (reqUrl.pathname.startsWith("/it/api/issues")) {
      return webApi.getIssue(req, rsp)
    }
  }
}



