


module.exports = function (issuesData, context) {
  const authInfo = document.querySelector("#auth-info")
  const mainContent = document.querySelector("#main-content")
  const templates = require('./templates')
  
  showCurrentUser()

  return states = {
    login: login,
    logout: logout
  }

  function showCurrentUser() {
    issuesData.currentUser().then(showCurrentUserInfo)

    function showCurrentUserInfo(user) {
      let loggedIn = context.user = user.user
      authInfo.innerHTML = loggedIn  ? templates.userLoggedIn(user) : templates.userLoggedOut()
    }
  }


  function login() {
    mainContent.innerHTML = templates.login()

    document.querySelector("#loginBtn").onclick = doLogin

    function doLogin() {
      issuesData.login(document.querySelector("#username").value, document.querySelector("#password").value).then(processLogin)

      function processLogin(loginStatus) {
        if(loginStatus.ok) {
          showCurrentUser()
          location.hash = "issues"
        }
      }
    }
  }

  function logout() {
    issuesData.logout().then(processLogout)

    function processLogout() {
      showCurrentUser()
    }
  }
}
