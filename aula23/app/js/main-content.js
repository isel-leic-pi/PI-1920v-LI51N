const issuesData = require('./issues-data')

const states = {
  issues: {
    script: issuesData.showIssues,
    template: templates.issues
  },
  issue: {
    script: issuesData.showIssue,
    template: templates.issue,
  },
  about: {
    script: nop,
    template: templates.about
  }
}


module.exports = {
  mainContent: document.querySelector("#main-content"),
  states:  states
}
