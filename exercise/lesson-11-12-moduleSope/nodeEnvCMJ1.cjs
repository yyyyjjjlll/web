// CJS

// 1. 不是自动严格模式
// 2. var声明的变量无法作为全局变量属性，（只要是模块化就无法……）
// var cmjVal = 1
// console.log(globalThis.cmjVal) // undefined

// module.exports = cmjVal
// module.exports = 123
// module.exports = {val: 123, string: '111'}

// 动态导入
// const Env = 'production'
// let config
// if(Env === 'production'){
//     config = require('./nodeEnvCMJ2.cjs')
// } else {
//     config = require('./nodeEnvCMJ3.cjs')
// }
// console.log(config)

function getc(){
    return count
}
let count = 0
function addc(){
    count++
    console.log(count);
    
}
module.exports = {count, addc, getc}

// const state = {
//     count:0
// }
// function addc(){
//     state.count++
//     console.log(state.count);
// }
// module.exports = {state, addc}