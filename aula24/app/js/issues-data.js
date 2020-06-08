module.exports = {
  getIssues: getIssues,
  getIssue: getIssue,
  createIssue: createIssue
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
}

const uriManager = new UriManager()

function getIssues() {
  return fetch(uriManager.getAllIssuesUri())
    .then(rsp => rsp.json())
}

function getIssue(issueId) {
  let uri = uriManager.getIssueUri(issueId)
  
  return fetch(uri)
    .then(rsp => rsp.json())
}

function createIssue(issue) {
    const issueBody = JSON.stringify(issue)

    const uri = uriManager.getAddIssueUri();
    return fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: issueBody
    }).then(rsp => rsp.json())
  }

