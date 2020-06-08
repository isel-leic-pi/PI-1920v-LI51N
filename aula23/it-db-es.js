const config = {
  host: 'localhost',
  port: 9200,
  index: "issues"
}

const error = require('./error')
const fetch = require('node-fetch')


module.exports = function () {
  
  const uriManager = new UriManager()

  return {
    getIssues: getIssues,
    getIssue: getIssue,
    addIssue: addIssue,
    deleteIssue: deleteIssue,
  }

  function UriManager() {
    const baseUri = `http://${config.host}:${config.port}/${config.index}/`
    this.getAllIssuesUri = () => `${baseUri}_search/`
    this.getIssueUri = (id) => `${baseUri}_doc/${id}`
    this.getAddIssueUri = () => `${baseUri}_doc/`
  }
  
  function getIssues() {
    console.log("GetIssues")
    let uri = uriManager.getAllIssuesUri()
    return makeRequest(uri)
      .then(body => body.hits.hits.map(issue => { return {id: issue._id, name: issue._source.name, description: issue._source.description } }))
  }

  function getIssue(id) {
    let uri = uriManager.getIssueUri(id)
    return makeRequest(uri).then(body => { 
      return {
        id: body._id, 
        name: body._source.name,
        description: body._source.description,

      } 
    })
  }

  function addIssue(issue) {

    
    const uri = uriManager.getAddIssueUri()
    const options = {method: "post", body: JSON.stringify(issue),  headers: { 'Content-Type': 'application/json' } }
    return makeRequest(uri, options).then(body => { issue.id = body._id; return issue })
  }


  function deleteIssue(id) {
    const idx = issues.findIndex(issue => issue.id == id)
    if (idx == -1) {
      cb(`Could not find issue with id ${id}`)
    }

    // const issue = issues[idx]
    // issues.splice(idx, 1)
    const issue = issues.splice(idx, 1)[0]


    return Promise.resolve(issue)
  }

/////////////////////////////////////

  function makeRequest(uri, options) {
    console.log(`Making a request to ${uri} `)
    return fetch(uri, options).then(rsp => rsp.json()).then(showBodyResponse)


    function showBodyResponse(body) {
      console.log(`Response body:"`, body)
      return body
    }
  }
}