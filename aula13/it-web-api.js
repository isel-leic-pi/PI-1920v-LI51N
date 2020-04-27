
const url = require('url')

const error = require('./error')

const router = require('express').Router() 


module.exports = function (itServices) {
  router.get('/issues', getIssues)
  router.get('/issues/:id', getIssue)
  router.post('/issues', addIssue)
  router.delete('/issues/:id', deleteIssue)
  

  return router;


  // GET /it/api/issues

  function getIssues(req, rsp) {
    sendResponse(itServices.getIssues(), rsp)
  }


  // GET /it/api/issues/:id

  function getIssue(req, rsp) {
    sendResponse(itServices.getIssue(req.params.id), rsp)
  }



  // POST /it/api/issues
  function addIssue(req, rsp) {

    console.log("body received: ", req.body)
    sendResponse(itServices.addIssue(req.body), rsp, 201)
  }


  // DELETE /it/api/issues/:id

  function deleteIssue(req, rsp) {
    sendResponse(itServices.deleteIssue(req.params.id), rsp)
  }

  ////////////// Internal auxiliary functions


  function sendResponse(p, rsp, successStatusCode = 200, errStatusCode = 500) {
    p.then(processSuccess(rsp, successStatusCode)).catch(processError(rsp, errStatusCode))
  }

  function processSuccess(rsp, statusCode) {
    console.log("processSuccess")
    return processResponse(rsp, () => statusCode)
  }

  function processError(rsp, statusCode) {
    console.log("processError")
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





