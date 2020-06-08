
const url = require('url')

const error = require('./error')

const router = require('express').Router() 


module.exports = function (itServices) {
  router.get('/issues', getIssues)
  router.get('/issues/:id', getIssue)
  router.post('/issues', addIssue)
  router.delete('/issues/:id', deleteIssue)
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  

  Promise.prototype.sendResponse = sendResponse

  return router;


  // GET /it/api/issues
  function getIssues(req, rsp) {
    itServices.getIssues().sendResponse(rsp)
  }


  // GET /it/api/issues/:id
  function getIssue(req, rsp) {
    console.log(req.params.id)
    itServices.getIssue(req.params.id).sendResponse(rsp)
  }



  // POST /it/api/issues
  function addIssue(req, rsp) {

    console.log("body received: ", req.body)
    itServices.addIssue(req.body).sendResponse(rsp, 201)
  }


  // DELETE /it/api/issues/:id

  function deleteIssue(req, rsp) {
    itServices.deleteIssue(req.params.id).sendResponse(rsp)
  }


  function login(req, rsp) {
    const credentials = req.body
    itServices.login(credentials).then(addAuthCookie).sendResponse(rsp)

    function addAuthCookie() {
      rsp.cookie("Auth", credentials.username)

      return "User authenticated"
    }
  }

  function logout(req, rsp) {
  }



  ////////////// Internal auxiliary functions


  function sendResponse(rsp, successStatusCode = 200, errStatusCode = 500) {
    this.then(processSuccess(rsp, successStatusCode)).catch(processError(rsp, errStatusCode))
  }

  function processSuccess(rsp, statusCode) {
    return processResponse(rsp, () => statusCode)
  }

  function processError(rsp, statusCode) {
    return processResponse(rsp, (data) => error.toHttpStatusCode(data))
  }

  function processResponse(rsp, statusCodeSup) {
    return function (data) {
      rsp.statusCode = statusCodeSup(data)
      rsp.setHeader("Content-Type", "application/json")
      rsp.end(JSON.stringify(data))
    }
  }
}





