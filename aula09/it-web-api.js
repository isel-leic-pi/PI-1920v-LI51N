
const url = require('url')
const itServices = require('./it-services')


module.exports = {
  getIssues : getIssues,
  getIssue : getIssue
}



// GET /it/api/issues

function getIssues(req, rsp) {
  itServices.getIssues(processIssues)

  function processIssues(e, issues) { 
    rsp.statusCode = 200
    rsp.setHeader("Content-Type", "application/json")
    rsp.end(JSON.stringify(issues))
  }
}



// GET /it/api/issues/:id

function getIssue(req, rsp) {
  const reqUrl = url.parse(req.url)
  const id = reqUrl.pathname.split('/').pop()

  itServices.getIssue(id, processIssue)

  function processIssue(e, issue) { 
    rsp.statusCode = 200
    rsp.setHeader("Content-Type", "application/json")
    rsp.end(JSON.stringify(issue))
  }
}







