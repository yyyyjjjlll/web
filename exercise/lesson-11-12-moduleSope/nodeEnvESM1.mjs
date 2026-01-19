//  - 模块化方式：有 ES6 模块（ESM）和 CommonJS 两种，均对单一文件模块化，模块内变量非全局变量。
// ESM：后（ES？统一浏览器和node作用机制， ）
// CMJ：先（node社区的一种规范）

// mjs: ESM模块化




// 模块化的var定义的变量无法作为全局作用域的变量
// var scopeval = 'hello'

// console.log(global)
// console.log(global.scopeval) // undefined
/*
ESM特性
1.当ESM进行解析，识别方式：1. type = "mudule"；2. 后缀是.mjs；3. package.json中type: module
2. 默认是严格模式，use strict写在顶部表示代码以严格模式strict mode执行，告诉v8引擎以严格形式执行代码
3. 加载的时机是编译和解析的时候，ESM模块化是静态
*/

// const fn1 = () =>{
//     console.log('hellow world')
// }

// export default {scopeval, fn1}

/*
export default
一个文件只能有一个
可以接任意表达式：函数声明、表达式，不能接变量声明
导入的时候不能包{}
export default const a = 1 // 不能接变量声明
export default class Person {} // 可以导出类
export default function addFun() {} // 可以导出函数
export default 123; // 可以导出
export default () => {}; // 可以导出表达式
*/

/*
export
一个文件能有多个
可以接函数声明、变量声明，不能接表达式
export const a = 1 // 能接变量声明
export class Person {} // 可以导出类
export function addFun() {} // 可以导出函数
export 123; // 不可以导出
export () => {}; // 不可以导出表达式

写法一：
export function addFn(){
    console.log('addFN')
}
写法二：
function addFn(){
    console.log('addFN')
}
export {addFn}
*/

// globalThis.globalESMN = 1

/*
ESM静态import，import在解析的时候会生成依赖图
treeshaking是webpack打包的功能，打包删除无用的模块，减少打包体积，前提是使用了ESM静态语法
o	静态性：import 具有静态属性，只能放顶部，是 tree - shaking 必须用 ES module 的原因。
o	tree - shaking：是 webpack 等打包功能，在打包阶段删除未使用代码，减少文件体积。依赖 ES module 静态语法，解析时生成依赖图以判断模块是否被使用。

CommonJS是动态，在执行的时候调用

o	CommonJS 动态性：CommonJS 是动态的，require 在运行时执行，类似函数调用。
o	ESM 动态 import：写法类似 require，返回 Promise。Promise 是 ES6 数据结构，有 resolve（成功）、reject（失败）、pending（初始）三种状态。可通过 try...catch 处理，也可用.then 方式获取值。
*/
// const config = {num: 1}
// export default config
// export const config = {num: 1}


/*
•	活绑定（Live Binding）：
o	ES model：具有活绑定特性，永远引用值的引用，值改变会实时反映。
o	CommonJS：是快照，后续调用返回缓存值。可通过对象属性或导出 getCount 函数方式实现类似活绑定效果。
*/
export let count = 0
export function addc(){
    count++
    console.log(count);
}