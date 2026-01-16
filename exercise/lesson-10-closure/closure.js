function outterfun() {
    let a = 'lexical a'
    function innerfun() {
        console.log('hello world', a)
    }
    return innerfun
}
// 持久闭包，造成内存泄漏
const fun1 = outterfun()
// 短暂闭包，不会造成内存泄漏
outterfun()() 


function make() {
    let n = 0;
    return () => ++n;
}
const c1 = make();
const c2 = make();

console.log(c1()) // 1
console.log(c1()) // 2
console.log(c1()) // 3
console.log(c2()) // 1

/* 
闭包作用
1. 数据私有化 
*/
function closureFn() {
    let a = 0;
    return {
        get: () => a,
        add: () => ++a,
    }
}
const c3 = closureFn()
console.log(c3.get()) // 0
console.log(c3.add()) // 1
console.log(c3.get()) // 1

/* 
2. Currying  柯里化：
一种思想，目标是将多个参数转换为单参数的链式调用
只能接受一个参数，返回函数，
*/
const addFun = (a, b, c) => a + b + c
const curryingFn = (a) => {
    console.log(a)
    return (b) => {
        console.log(b)
        return (c) => {
            console.log(c)
            return a + b + c
        }
    }
}
console.log(curryingFn(1)(2)(3)) // 1,2,3,6 链式调用写法

/* 
3. Partial Function 偏函数： 
用偏函数产生的函数得到新的函数
*/
// const partialFun =
//     (fn, ...preset) =>
//         (...rest) =>
//             fn(...preset, ...rest);

const partialFun = (fn, ...preset) => {
    return (...rest) => {
        return fn(...preset, ...rest)
    }
}

const addFn = partialFun((a,b)=>a+b, 1)
console.log(addFn(2)) // 3


/* 
baseUrl , path ，fetch => 针对不同接口的写法
 */
