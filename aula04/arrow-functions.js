'use strict'

// Function definition
function mul(a, b) {
  return a*b
}

let mulArrow = (a,b) => a*b


function Point(x, y) {
  this.x = x
  this.y = y

  this.add = p => {
    // `this`here is the lexical this, being always
    // the one that existed when the arrow function was defined
    console.log('$$$', this)
     return new Point(this.x + p.x, this.y + p.y)
  }

  this.add1 = function(p) {
    // `this`here is the lexical this, being always
    // the one that existed when the arrow function was defined
    console.log('###', this)
     return new Point(this.x + p.x, this.y + p.y)
  }

  //console.log(this);
}


var p = new Point(1,2)
var p1 = new Point(3,4)

p1.add(p1)  // in function call 'this' will reference the same object as 'p1' 
p1.add1(p1)  // in function call 'this' will reference the same object as 'p1' 

let a = p.add
let a1 = p.add1


let p2 = a(p1)
let p3 = a1(p1)


