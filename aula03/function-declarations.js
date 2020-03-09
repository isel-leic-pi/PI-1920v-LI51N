// Unnamed function

let f = function () { 
  for(let i = 0; i < arguments.length; ++i) {
    console.log(`arguments[${i}]=${arguments[i]}`)
  }
  console.log("------------")
}
console.log(`$ ${f.name}`)


// Named function
let f3 = function f1(p) { 
  if(p) f1();
  console.log("#f1") 
}

console.log(`$$ ${f3.name}`)

let f2 = f3;
f3 = null;

f2(1)


let f4 = (a,b,c) => { }

console.log(f4.name)




