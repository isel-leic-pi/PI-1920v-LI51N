window.onload = function (e) {  
  let context = {}
  const issuesData = require('./issues-data')
  const authStates = require('./auth-controller')(issuesData, context)
  const issuesStates = require('./issues-controller')(issuesData, context)


  const states = Object.assign(authStates, issuesStates) 
  require('./state-router')(states, "issues")
}