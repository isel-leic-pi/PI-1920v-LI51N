const error = require('./error')


const issues = require('./issues')

let maxId = issues.length+1


module.exports = {
  getIssues: getIssues,
  getIssue: getIssue,
  addIssue: addIssue,
  deleteIssue: deleteIssue,
}


function getIssues(cb) {
  cb(null, issues)  
  
}

function getIssue(id, cb) {
  const issue = issues.find(issue => issue.id == id)
  if(!issue) {
    return cb(`Could not find issue with id ${id}`)
  }
  cb(null, issue)  
}

function addIssue(issue, cb) {
  issue.id = maxId++
  issues.push(issue)

  cb(null, issue)
}


function deleteIssue(id, cb) {
  const idx = issues.findIndex(issue => issue.id == id)
  if(idx == -1) {
    cb(`Could not find issue with id ${id}`)
  }

  // const issue = issues[idx]
  // issues.splice(idx, 1)
  const issue = issues.splice(idx, 1)[0]


  cb(null, issue)  
}