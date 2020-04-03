

// module.exports.foo = "SLB"
// module.exports.m = function () {
//   console.log("A method from the object exported by this module was called")
// }

let cnt = 0

console.log("Module begin")

module.exports = {
  foo: "SLB",
  m : function () {
    console.log("A method from the object exported by this module was called")
    console.log(cnt++)
  }
}


console.log("Module end")