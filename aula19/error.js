module.exports = function error(message) {
  return {
    errorMessage: message
  }
}

module.exports.toHttpStatusCode = function(e) {
  return 404;
}