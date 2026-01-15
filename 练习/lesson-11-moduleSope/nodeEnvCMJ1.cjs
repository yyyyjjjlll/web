// CJS

// 1. 不是自动严格模式
// 2. var声明的变量无法作为全局变量属性，（只要是模块化就无法……）
// var cmjVal = 1
// console.log(globalThis.cmjVal) // undefined

// module.exports = cmjVal
// module.exports = 123
module.exports = {val: 123, string: '111'}