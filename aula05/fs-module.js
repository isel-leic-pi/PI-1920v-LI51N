let fs = require('fs')

fs.readFile('./fs-module.js', processFile)


function processFile(err, data) {
  if(err) {
    return console.error(err)
  }
  console.log('file content', data.toString())
}

console.log('All asynchronous operations started.')

