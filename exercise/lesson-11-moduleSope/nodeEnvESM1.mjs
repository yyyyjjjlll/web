//  - 模块化方式：有 ES6 模块（ESM）和 CommonJS 两种，均对单一文件模块化，模块内变量非全局变量。
// ESM：后（ES？统一浏览器和node作用机制， ）
// CMJ：先（node社区的一种规范）

// mjs: ESM模块化




// 模块化的var定义的变量无法作为全局作用域的变量
var scopeval = 'hello'

console.log(global)
console.log(global.scopeval) // undefined
/*
ESM特性
1.当ESM进行解析，识别方式：1. type = "mudule"；2. 后缀是.mjs；3. package.json中type: module
2. 默认是严格模式，use strict写在顶部表示代码以严格模式strict mode执行，告诉v8引擎以严格形式执行代码
3. 加载的时机是编译和解析的时候，ESM模块化是静态
*/

const fn1 = () =>{
    console.log('hellow world')
}

export default {scopeval, fn1}

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

globalThis.globalESMN = 1