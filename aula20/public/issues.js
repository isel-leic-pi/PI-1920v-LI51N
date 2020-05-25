window.onload = function (e) {
  const config = {
    host: 'localhost',
    port: 1904,
    baseApi: "it/api/"
  }


  function UriManager() {
    const baseUri = `http://${config.host}:${config.port}/${config.baseApi}`
    this.getAllIssuesUri = () => `${baseUri}issues/`
    this.getIssueUri = (id) => `${baseUri}issue/${id}`
    this.getAddIssueUri = () => `${baseUri}issues/`
  }

  const uriManager = new UriManager()



  let functionName = window.location.pathname.substring(1).split(".")[0]

  const router = {
    index: index,
    issue: issue
  }

  router[functionName]()

  function index() {
    document.querySelector("#create-issue-btn").onclick = createIssue

    fetch(uriManager.getAllIssuesUri())
      .then(rsp => rsp.json())
      .then(showItems)



    function showItems(items) {

      let itemsHtml = items.map(item =>
        `<tr>
              <td><a href="issue.html?id=${item.id}">${item.name}</a></td>
              <td>${item.description}</td>
          </tr>`)
        .join('\n')

      const table = document.querySelector("#items")
      table.innerHTML += itemsHtml
    }


    function createIssue() {
      let issue = {}
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
    }

    function processResponse(response) {
      if(response.ok) {
        location.reload()
      } else {
        console.log("error creating issue")
      }

    }
  }

  function issue() {
    const issueId = window.location.search.substring(1).split("=")[1]
    let uri = uriManager.getIssueUri(id)
    console.log(uri)
    fetch(uri)
      .then(rsp => rsp.json())
      .then(showItem)

    function showItem(item) {
      Object.keys(item).forEach(propName => document.querySelector(`#${propName}`).innerHTML += item[propName])
    }
  }
}