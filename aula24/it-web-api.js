
const url = require('url')

const error = require('./error')

const router = require('express').Router() 


module.exports = function (itServices) {
  const AUTH_COOKIE_NAME = "Auth"

  router.get('/issues', getIssues)
  router.get('/issues/:id', getIssue)
  router.post('/issues', addIssue)
  router.delete('/issues/:id', deleteIssue)
  router.post('/auth/login', login)
  router.post('/auth/logout', logout)
  router.get('/auth/currentUser', currentUser)
    
  Promise.prototype.sendResponse = sendResponse
  
  return router;
  

  // GET /it/api/issues
  function getIssues(req, rsp) {
    itServices.getIssues(req.user).sendResponse(rsp)
  }


  // GET /it/api/issues/:id
  function getIssue(req, rsp) {
    itServices.getIssue(req.params.id, req.user).sendResponse(rsp)
  }



  // POST /it/api/issues
  function addIssue(req, rsp) {
    itServices.addIssue(req.body).sendResponse(rsp, 201)
  }


  // DELETE /it/api/issues/:id

  function deleteIssue(req, rsp) {
    itServices.deleteIssue(req.params.id).sendResponse(rsp)
  }


  function login(req, rsp) {
    const credentials = req.body
    itServices.login(credentials).then(addAuthCookie).sendResponse(rsp)

    function addAuthCookie(loginStatus) {
      if(loginStatus.ok)
        rsp.cookie(AUTH_COOKIE_NAME, credentials.username)
      return loginStatus
    }
  }

  function logout(req, rsp) {
    itServices.logout().then(removeAuthCookie).sendResponse(rsp)

    function removeAuthCookie() {
      rsp.clearCookie(AUTH_COOKIE_NAME)
      return Promise.resolve("user logged out")
    }
  }

  function currentUser(req, rsp) {
    console.log("$$$$$$")
    Promise.resolve({ user: req.user} ).sendResponse(rsp)
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





