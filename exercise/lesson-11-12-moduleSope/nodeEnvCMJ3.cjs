// const config = {num: 3}
// module.exports = config
const v = 'hello'
function addv(){
    console.log(v+'world')
}
console.log(this) // {}
console.log(this===module.exports) // true


this.v1 = 'world'

/*
本质：用函数作用域替代模块作用域
(function name(exports,require) {
         XXX
    })()
 */