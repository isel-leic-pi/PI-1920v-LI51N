window.onload = function (e) {  
  let issuesData = require('./issues-data')
  let states = require('./issues-controller')(issuesData)
  require('./state-router')(states, "issues")
}