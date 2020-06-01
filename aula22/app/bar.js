const foo = require('./foo')

module.exports = function() {
  foo()
  console.log("bar was called")
}