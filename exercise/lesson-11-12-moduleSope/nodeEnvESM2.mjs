// import ESM1object from "./nodeEnvESM1.mjs" // 整个文件1执行了一遍
// import { addFn } from "./nodeEnvESM1.mjs"
// const {scopeval, fn1} = ESM1object
// console.log(scopeval)
// console.log(fn1)

// addFn()
// console.log(globalThis.globalESMN) // 导入1后可以使用

/*
// 动态引入
const Env = 'production'
let config
let path = Env ===  'production' ? "./nodeEnvESM1.mjs" :"./nodeEnvESM3.mjs"
try{
    // 写法一
    import(path).then((module)=>{
        config = module.default
    }).catch((error)=>console.log(error))
    // 写法二
    // 导入的module：[Module: null prototype] { config: { num: 1 } }
    // 导入的module：[Module: null prototype] { default: { num: 1 } }
    // const module = await import(path) 
    // config = module.default // export default config
    // config = module.config // export const config
    // console.log(module) 
} catch(error) {
    console.log(error)
}
*/

// ESM是活绑定，live bindings，可以改变count的值
import { count, addc } from './nodeEnvESM1.mjs'
console.log('mjs2',count) // 0
addc() // 1
addc() // 2
console.log('mjs2',count) // 2
