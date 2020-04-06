const issues = [
    {
      id: 1,
      name: "issue12",
      description: "description of issue 1"
    },
    {
      id: 2,
      name: "issue2",
      description: "description of issue 2"
    }
  ]



module.exports = {
  getIssues: getIssues,
  getIssue: getIssue,

}


function getIssues(cb) {
  cb(null, issues)  
  
}

function getIssue(id, cb) {
  cb(null, issues.find(issue => issue.id == id))  
}