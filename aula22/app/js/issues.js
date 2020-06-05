window.onload = function (e) {  

  const templates = require('./templates')

  const main = require('./main-content')





  window.onhashchange = stateChanged
  

  stateChanged()

  function stateChanged() {
    let stateData = window.location.hash.substring(1).split("/")

    let [state, ...stateArgs] = stateData
    // Equivalent conde to the previous line
    // let state = stateData.shift()
    // let stateArgs = stateData 


    let stateObj = main.states[state]
    if (!stateObj) {
      window.location.hash = "issues"
      return
    }
  
    //stateObj.script.apply(null, stateArgs)
    stateObj.script(...stateArgs)
  }


  ////// Functions executed in each page state
  


  function nop() { }
}