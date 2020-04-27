const error = require('./error')



module.exports = function (itDb) {

  return {
    init: init,
    getIssues: getIssues,
    getIssue: getIssue,
    addIssue: addIssue,
    deleteIssue: deleteIssue
  }

  function init(db) {
    itDb = db
  }

  function getIssues() {
    return itDb.getIssues()
  }

  function getIssue(id) {
    if (isInvalidId(id)) {
      return Promise.resolve(error('Invalid id to get a resource'))
    }

    return itDb.getIssue(id)
  }

  function addIssue(issue) {
    // Issue validation should be done here

    return itDb.addIssue(issue)
  }

  function deleteIssue(id) {
    if (isInvalidId(id)) {
      return Promise.reject(error('Invalid id for resource to delete'))
    }

    return itDb.deleteIssue(id)
  }


  function isInvalidId(id) {
    return !id || !Number(id)
  }
}