// 模块作用域
// node环境：undefined，浏览器环境：0，当浏览器script添加 type="module"：undefined
var globalVal = 0;
console.log(globalThis.globalVal) // globalThis在node环境中是global，在浏览器环境是window

// 块级作用域
// var在块级作用域内定义的变量，在块级作用域外也能访问
// let在块级作用域内定义的变量，在块级作用域外不能访问
{ 
    let a = 'block scope';
    var b = 'block scope b'
}
console.log('out a',a) // ReferenceError: a is not defined
console.log('out b',b) // out b block scope b

// 函数作用域
// var，let在函数作用域内定义的变量，在函数作用域外不能访问
function test(){
    let a = 'function scope let'
    var b = 'function scope var'
    console.log('in a',a)
    console.log('in b',b)
}
console.log('out a',a) // ReferenceError: a is not defined
console.log('out b',b) // ReferenceError: b is not defined

// 词法作用域：lexical scope，不是一种作用域，一种变量查找的规则
// 是否能访问变量，取决于定义时作用域链，而不是调用时的作用域链
function lexicalFun(){
    console.log('hello world', a)
}
function lexicalFun2(){
    let a = 'lexical a'
    lexicalFun()
}
lexicalFun2() // ReferenceError: a is not defined

// 使lexicalFun能访问到a
// 方法一，作为参数传递
function lexicalFun(a){
    console.log('hello world', a)
}
function lexicalFun2(){
    let a = 'lexical a'
    lexicalFun(a)
}
lexicalFun2()
// 方法二，将a放在函数作用域外定义
let a = 'lexical a'
function lexicalFun(){
    console.log('hello world', a)
}
function lexicalFun2(){
    lexicalFun()
}
lexicalFun2()
// 方法三，闭包closure
function lexicalFun2(){
    let a = 'lexical a'
    function lexicalFun(){
        console.log('hello world', a)
    }
    return lexicalFun
}
lexicalFun2()
// 变量无法被垃圾回收并且依然在内存中，就构成了闭包
// 函数拿走了定义的地方的词法作用域
// 闭包决定了拿到的变量不被销毁
// 闭包对抗的就是垃圾回收
const fn = lexicalFun2()
fn() // a不会被垃圾回收

