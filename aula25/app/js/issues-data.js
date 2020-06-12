module.exports = {
  getIssues: getIssues,
  getIssue: getIssue,
  createIssue: createIssue,
  login: login,
  logout: logout,
  currentUser: currentUser,
}

function UriManager() {
  const config = {
    host: 'localhost',
    port: 1904,
    baseApi: "it/api/"
  }

  const baseUri = `http://${config.host}:${config.port}/${config.baseApi}`
  this.getAllIssuesUri = () => `${baseUri}issues/`
  this.getIssueUri = (id) => `${baseUri}issues/${id}`
  this.getAddIssueUri = () => `${baseUri}issues/`
  this.getLoginUri = () => `${baseUri}auth/login`
  this.getLogoutUri = () => `${baseUri}auth/logout`
  this.getCurrentUserUri = () => `${baseUri}auth/currentUser`
}

const uriManager = new UriManager()

function getIssues() {
  return fetch(uriManager.getAllIssuesUri()).then(rsp => rsp.json())
}

function getIssue(issueId) {
  return fetch(uriManager.getIssueUri(issueId)).then(rsp => rsp.json())
}

function createIssue(issue) {
    const uri = uriManager.getAddIssueUri();
    return doPost(uri, issue)
  }


  function login(username, password) {
    const credentials = { username: username, password: password}

    const uri = uriManager.getLoginUri();

    return doPost(uri, credentials)
  }

  function logout() {
    const uri = uriManager.getLogoutUri();
    return doPost(uri).then()
  }

  function doPost(uri, data) {
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(data)
    }).then(rsp => rsp.json())
  }

  function currentUser() {
      return fetch(uriManager.getCurrentUserUri()).then(rsp => rsp.json())
  }

