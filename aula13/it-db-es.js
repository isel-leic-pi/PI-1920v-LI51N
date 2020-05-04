const config = {
  host: 'localhost',
  port: 9200,
  index: "issues"
}

const error = require('./error')
const req = require('request')


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
  }
  

  


  function getIssues() {
    console.log("$$$$$$$$$")
    return new Promise(function(resolve, reject) { 
      let uri = uriManager.getAllIssuesUri()
      console.log("uri" + uri)

      request(uri, processResponse)

      function processResponse(err, rsp, body) {
        if(err) {
          reject(err)
        } else {
          resolve(body)
        }

      }
    })
  }

  function getIssue(id) {
    const issue = issues.find(issue => issue.id == id)
    if (!issue) {
      return Promise.reject(`Could not find issue with id ${id}`)
    }
    return Promise.resolve(issue)
  }

  function addIssue(issue) {
    issue.id = maxId++
    issues.push(issue)

    return Promise.resolve(issue)
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





  function request(uri, cb, method = "GET") {
    console.log(`Making a ${method} request to ${uri} `)
    req({ uri: uri}, processRsp)


    function processRsp(err, rsp, body) {
        console.log("Response body1: " + body)
        cb(err, rsp, JSON.parse(body))
    }
  }
}