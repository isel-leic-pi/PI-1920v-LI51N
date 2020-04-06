
const url = require('url')
const itServices = require('./it-services')
const error = require('./error')


module.exports = {
  getIssues : getIssues,
  getIssue : getIssue,
  addIssue : addIssue,
  deleteIssue : deleteIssue
}



// GET /it/api/issues

function getIssues(req, rsp) {
  itServices.getIssues(processResponse(rsp))

  
}



// GET /it/api/issues/:id

function getIssue(req, rsp) {
  itServices.getIssue(req.params.id, processResponse(rsp))

  
}



// POST /it/api/issues
function addIssue(req, rsp) {

  console.log("body received: ", req.body)
  itServices.addIssue(req.body, processResponse(rsp, 201))
}


// DELETE /it/api/issues/:id

function deleteIssue(req, rsp) {
  itServices.deleteIssue(req.params.id, processResponse(rsp))

}

function processResponse(rsp, successStatusCode = 200) {
  return function processIssues(e, issues) { 
    rsp.statusCode = e ? error.toHttpStatusCode(e) : successStatusCode 
    rsp.setHeader("Content-Type", "application/json")
    rsp.end(JSON.stringify(issues))
  }
}








