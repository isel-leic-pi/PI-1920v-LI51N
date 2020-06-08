const error = require('./error')



module.exports = function (itDb) {

  return {
    init: init,
    getIssues: getIssues,
    getIssue: getIssue,
    addIssue: addIssue,
    deleteIssue: deleteIssue,
    login: login,
    logout: logout
  }

  function init(db) {
    itDb = db
  }

  async function getIssues(user) {
    console.log(`Getting issues for user ${user}`)
    return itDb.getIssues()//.then(processIssues)

    function processIssues(issues) {
      return issues.map((issue, idx) => { issue.idx = idx; return issue })
    }

    // Or the same with with await

    // let issues = await itDb.getIssues()

    // return issues.map((issue, idx) => { issue.idx = idx; return issue })
  }

  function getIssue(id, user) {
    if (isInvalidId(id)) {
      return Promise.resolve(error('Invalid id to get a resource'))
    }

    return itDb.getIssue(id)
  }

  function addIssue(issue, user) {
    // Issue validation should be done here

    return itDb.addIssue(issue)
  }

  function deleteIssue(id, user) {
    if (isInvalidId(id)) {
      return Promise.reject(error('Invalid id for resource to delete'))
    }

    return itDb.deleteIssue(id)
  }


  function login(credentials) {
    return Promise.resolve(true)
  }

  function logout() {
    return Promise.resolve(true)
  }




  function isInvalidId(id) {
    //return !id || !Number(id)
    return false
  }
}