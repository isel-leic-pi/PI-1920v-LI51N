module.exports = function error(message) {
  return {
    errorMessage: message
  }
}

module.exports.toHttpStatusCode = function(e) {
  console.log("error: ", e)
  return 404;
}