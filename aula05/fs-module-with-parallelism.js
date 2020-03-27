let fs = require('fs')

for(let i = 0; i < 3; ++i) {
  fs.readFile(`./${i}.txt`, processFile)
}


function processFile(err, data) {
  if(err) {
    return console.error(err)
  }
  console.log(data.toString())
}

console.log('All asynchronous operations started.')

