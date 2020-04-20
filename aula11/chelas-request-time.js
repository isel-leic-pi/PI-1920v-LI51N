
module.exports = function(options = {start: false, end: false, duration: true }) {
  return function (req, rsp, next) {
    const start = Date.now()
    if(options.start) {
      console.log(`start time: ${new Date(start).toUTCString()}`)
    }
    rsp.on('finish', endRequest)
    next()

    function endRequest() {
      const end = Date.now()
      if(options.end) {
        console.log(`end time: ${new Date(end).toUTCString()}`)
      }

      if(options.duration) {
        console.log(`Request took ${end-start} ms`)
      }
    }
  }
}