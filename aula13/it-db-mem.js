const error = require('./error')


module.exports = function (issuesFile = './issues') {
  
  const issues = require(issuesFile)
  let maxId = issues.length + 1

  return {
    getIssues: getIssues,
    getIssue: getIssue,
    addIssue: addIssue,
    deleteIssue: deleteIssue,
  }


  function getIssues() {
    return Promise.resolve(issues)

  }

  function getIssue(id) {
    const issue = issues.find(issue => issue.id == id)
    if (!issue) {
      return Promise.reject(`Could not find issue with id ${id}`)
    }
    return Promise.resolve(issue)
  }

  function addIssue(issue) {
    issue.id = maxId++
    issues.push(issue)

    return Promise.resolve(issue)
  }


  function deleteIssue(id) {
    const idx = issues.findIndex(issue => issue.id == id)
    if (idx == -1) {
      cb(`Could not find issue with id ${id}`)
    }

    // const issue = issues[idx]
    // issues.splice(idx, 1)
    const issue = issues.splice(idx, 1)[0]


    return Promise.resolve(issue)
  }

}