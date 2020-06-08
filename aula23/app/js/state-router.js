
module.exports = function(states, defaultState) {
  
  window.onhashchange = stateChanged  
  stateChanged()
  
  function stateChanged() {
    let stateData = window.location.hash.substring(1).split("/")

    let [state, ...stateArgs] = stateData

    let stateObj = states[state]
    if (!stateObj) {
      window.location.hash = defaultState
      return
    }
    
  
    //stateObj.script.apply(null, stateArgs)
    stateObj(...stateArgs)
  }
}


