const itDb = require('./it-db')
const error = require('./error')



module.exports = {
  getIssues: getIssues,
  getIssue: getIssue,
  addIssue: addIssue,
  deleteIssue: deleteIssue
  

}


function getIssues(cb) {
  itDb.getIssues(cb)  
}

function getIssue(id, cb) {
  if(isInvalidId(id)) {
    cb(error('Invalid id to get a resource'))
  }

  itDb.getIssue(id, cb)  
}

function addIssue(issue, cb) {
  // Issue validation should be done here

  itDb.addIssue(issue, cb)
}

function deleteIssue(id, cb) {
  if(isInvalidId(id)) {
    cb(error('Invalid id for resource to delete'))
  }

  itDb.deleteIssue(id, cb)
}


function isInvalidId(id) {
  return !id ||  !Number(id)
}

