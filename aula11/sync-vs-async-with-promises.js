function mul(a, b) {
  return a * b
}

// let res = mul(2,3)

// console.log(1)
// console.log(res)

// console.log('------------')


// function mulAsyncWithSyncImplementation(a, b, cb) {
//   cb(a*b);
// }

// console.log(2)
// mulAsyncWithSyncImplementation(2,3, processResult)
// console.log(3)
// mulAsyncWithSyncImplementation(3,4, processResult)
// console.log(4)

// console.log('------------')

// function mulAsyncWithAsyncImplementation(a, b, cb) {
//   let wait = getRandomInt(2000)
//   console.log(`waiting: ${wait} ms`)
//     setTimeout(() => {
//       cb(a*b)  
//     }, wait)
// }

// console.log(5)
// mulAsyncWithAsyncImplementation(2,3, processResult)
// console.log(6)
// mulAsyncWithAsyncImplementation(3,4, processResult)
// console.log(7)


// function getRandomInt(max) {
//   return Math.floor(Math.random() * max)
// }


function mulWithPromiseSync(a, b) {
  if (!(Number(a) && Number(b)))
    return Promise.reject("Operands must be numbers")
  return Promise.resolve(a * b)
}


function mulWithPromiseAsync(a, b) {
  return new Promise(function (success, error) {
    setTimeout(performMult, 3000)

    function performMult() {
      if (!(Number(a) && Number(b)))
        return error("Operands must be numbers")
      return success(a * b)
    }
  })
}

console.log("######### Now with Promises")

console.log("success")
mulWithPromiseSync(2, 3).then(processResult).catch(processError)

console.log("error")
mulWithPromiseSync().then(processResult).catch(processError)


console.log("success")
mulWithPromiseAsync(4, 6).then(processResult).catch(processError)

console.log("error")
mulWithPromiseAsync().then(processResult).catch(processError)

function processResult(res) {
  console.log(`Result is ${res}`)
}

function processError(err) {
  console.log(`Erros is ${err}`)
}

