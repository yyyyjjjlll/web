import ESM1object from "./nodeEnvESM1.mjs" // 整个文件1执行了一遍
// import { addFn } from "./nodeEnvESM1.mjs"
// const {scopeval, fn1} = ESM1object
// console.log(scopeval)
// console.log(fn1)

// addFn()
console.log(globalThis.globalESMN) // 导入1后可以使用