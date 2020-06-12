module.exports = function (issuesData, context) {
  const mainContent = document.querySelector("#main-content")
  const templates = require('./templates')

  return states = {
    issues: showIssues,
    issue: showIssue,
    about: nop
  }

  function showIssues() {
    if(context.user) {
      issuesData.getIssues().then(showView)
    } else {
      location.hash = "login"
    }

    function showView(items) {
      mainContent.innerHTML = templates.issues(items)
      document.querySelector("#create-issue-btn").onclick = createIssue


    }
  }

function createIssue() {
    let issue = { }
    document.querySelectorAll(".issue-data input")
      .forEach(input => issue[input.id] = input.value)
    issuesData.createIssue(issue).then(__ => showIssues())
 }

  
  function showIssue(issueId) {
    issuesData.getIssue(issueId).then(showIssueView)

    function showIssueView(issue) {
      mainContent.innerHTML = templates.issue(issue)   
    }
  }



  function nop() { }
}