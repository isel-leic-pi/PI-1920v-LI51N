module.exports = {
  showIssue: showIssue,
  showIssues: showIssues
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

const main = require('./main-content')

function showIssues() {
  fetch(uriManager.getAllIssuesUri())
    .then(rsp => rsp.json())
    .then(showView)

  function showView(items) {
    main.mainContent.innerHTML = main.states.issues.template(items)

    document.querySelector("#create-issue-btn").onclick = createIssue
  }

  function createIssue() {
    let issue = { }
    document.querySelectorAll(".issue-data input").forEach(input => issue[input.id] = input.value)

    const issueBody = JSON.stringify(issue)

    console.log(`Issue obj ${issueBody}`)

    const uri = uriManager.getAddIssueUri();
    fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: issueBody
    }).then(processResponse)

    function processResponse(response) {
      if (response.ok) {
        location.reload()
      } else {
        console.log("error creating issue")
      }
    }
  }
}

function showIssue(issueId) {
  let uri = uriManager.getIssueUri(issueId)
  console.log(uri)
  fetch(uri)
    .then(rsp => rsp.json())
    .then(showIssueView)

  function showIssueView(item) {
    main.mainContent.innerHTML = main.states.issue.template(item)
  }
}