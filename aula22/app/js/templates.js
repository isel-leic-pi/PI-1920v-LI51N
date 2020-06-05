const Handlebars = require('handlebars')


module.exports = {
  issues: Handlebars.compile(require('../templates/issues.hbs')),
  issue: Handlebars.compile(require('../templates/issue.hbs')),
  about: Handlebars.compile(`<h1>About Issues application (TBD)</h1>`)
}