window.onload = function (e) {  
  const issuesData = require('./issues-data')
  const authStates = require('./auth-controller')(issuesData)
  const issuesStates = require('./issues-controller')(issuesData)


  const states = Object.assign(authStates, issuesStates) 
  require('./state-router')(states, "issues")
}