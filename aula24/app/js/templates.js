const Handlebars = require('handlebars')


module.exports = {
  issues: Handlebars.compile(require('../templates/issues.hbs')),
  issue: Handlebars.compile(require('../templates/issue.hbs')),
  userLoggedIn: Handlebars.compile(require('../templates/user-logged-in.hbs')),
  userLoggedOut: Handlebars.compile(require('../templates/user-logged-out.hbs')),
  login: Handlebars.compile(require('../templates/login.hbs')),
  about: Handlebars.compile(`<h1>About Issues application (TBD)</h1>`)
}