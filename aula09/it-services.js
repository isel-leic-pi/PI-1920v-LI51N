const itDb = require('./it-db')



module.exports = {
  getIssues: getIssues,
  getIssue: getIssue
  

}


function getIssues(cb) {
  itDb.getIssues(cb)  
}

function getIssue(id, cb) {
  itDb.getIssue(id, cb)  
}