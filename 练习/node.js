// console.log(global)
// console.log(window)
// console.log(a)
// let a = 1;
// var a = 2;
// let a = 2;
// for (var i=0; i<3; i++) {
//     setTimeout(()=>console.log(i))
// }
// var shadowing = 'hello'
// function shadowingFn() {
//     console.log('variable shadowing:',shadowing);
//     var shadowing = 'world'
// }
// shadowingFn();

// var shadowing = 'hello'
// function shadowingFn() {
//     console.log('variable shadowing:',shadowing);
// }
// shadowingFn();

// var shadowing = 'hello'
// function shadowingFn() {
//     console.log('variable shadowing:',shadowing);
//     shadowing = 'world'
// }
// shadowingFn();

// var shadowing = 'hello'
// function shadowingFn() {
//     console.log('variable shadowing:',shadowing);
//     let shadowing = 'world'
// }
// shadowingFn();

// {
//     const b = 2;
//     b = 3;
//     console.log(b)
// }

// main();

// function main() {
//   console.log(user);
//   var user = { name: "xiaoyao" };

//   console.log(age);
//   let age = 33;

//   sayHi();
//   function sayHi() {
//     console.log("hi");
//   }
// }
'use strict'
let user = {age: 25}
Object.freeze(user)
user.age = 1
console.log(user)

