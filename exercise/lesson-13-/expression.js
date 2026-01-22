function c() {
    console.log('hello world')
    return 3
}
console.log(c()) // 没有return：undefined // 有return：3

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
// ++a
a = a+1
return a
// a++
temp = a
a = a+1
return temp
// a+1
return 1(a=0)
*/

// 赋值表达式，输出的赋的值
// let x
// console.log(x=1) // 1
// let x
// console.log(x = 999) // 999

// 比较表达式，输出布尔值

// 选择器
// console.log(0 && 5) // 0
// console.log(5 && 0) // 0
// console.log(0 || 5) // 5
// console.log(5 || 0) // 5
