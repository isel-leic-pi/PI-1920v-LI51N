Handlebars.compile("blablabla")

window.onload = function (e) {
  const config = {
    host: 'localhost',
    port: 1904,
    baseApi: "it/api/"
  }

  function UriManager() {
    const baseUri = `http://${config.host}:${config.port}/${config.baseApi}`
    this.getAllIssuesUri = () => `${baseUri}issues/`
    this.getIssueUri = (id) => `${baseUri}issues/${id}`
    this.getAddIssueUri = () => `${baseUri}issues/`
  }

  const uriManager = new UriManager()

  const states = {
    issues: {
      script: showIssues,
      template: Handlebars.compile(`
        <section id="show-issues">
        <h1>Issues List</h1>
        <table>
        <thead>
        <tr>
        <td>Name</td>
        <td>Description</td>
        </tr>
        </thead>
        <tbody id="items">
        {{#each this}}
          <tr>
            <td><a href="#issue/{{id}}">{{name}}</a></td>
            <td>{{description}}</td>
          </tr>
       {{/each}}
        </tbody>
        </table>
        </section>
        
        <section id="create-issue">
        <h2>Create a new Issue</h2>
        <div class="issue-data">
        <div><span>Issue name: </span><input type="text" id="name" /></div>
        <div><span>Issue description:</span><input type="text" id="description" /></div>
        </div>
        <button id="create-issue-btn">Create Issue</button>
      
      </section>`)
    },
    issue: {
      script: showIssue,
      template: Handlebars.compile(`<h1>Issues details</h1>
      <article>
      <div id="id">Id: {{id}}</div>
      <div id="name">Name: {{name}}</div> 
      <div id="description">Description: {{description}} </div>
      </article>`),
    },
    about: {
      script: nop,
      template: Handlebars.compile(`<h1>About Issues application (TBD)</h1>`)
    }
  }


  window.onhashchange = stateChanged
  const mainContent = document.querySelector("#main-content")

  stateChanged()

  function stateChanged() {
    let stateData = window.location.hash.substring(1).split("/")

    let [state, ...stateArgs] = stateData
    // Equivalent conde to the previous line
    // let state = stateData.shift()
    // let stateArgs = stateData 


    let stateObj = states[state]
    if (!stateObj) {
      window.location.hash = "issues"
      return
    }
  
    //stateObj.script.apply(null, stateArgs)
    stateObj.script(...stateArgs)
  }


  ////// Functions executed in each page state
  function showIssues() {
    fetch(uriManager.getAllIssuesUri())
      .then(rsp => rsp.json())
      .then(showView)

    function showView(items) {
      mainContent.innerHTML = states.issues.template(items)

      document.querySelector("#create-issue-btn").onclick = createIssue
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
      mainContent.innerHTML = states.issue.template(item)
    }
  }


  function nop() { }
}