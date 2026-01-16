// 1. evevt loop
async定义一个异步函数
async function async1() {
  console.log("async1 start");
  await async2(); // 会立刻执行，
  console.log("async1 end"); // 被放进异步任务=>微任务中去
}

async function async2() {
  console.log("async2");
}

console.log("script start");
//setTimeout会执行，参数的回调函数不会，里面的函数是个异步任务=>宏任务，进入宏任务队列，继续执行同步代码
setTimeout(function () {
  console.log("setTimeout");
}, 0);
// 会执行
async1();
// 立即执行
new Promise(function (resolve) {
  console.log("promise1");
  resolve(); 
}).then(function () { //形成异步任务=>微任务（.then回调)
  console.log("promise2");
});

console.log("script end");

// error:
// "script start"
// "async1 start"
//"async2"
// "async1 end"
// "script end"
// "setTimeout"
// "promise1"
// "promise2"

// js单线程，使用event loop实现非阻塞执行模型
// answer:
// "script start"
// "async1 start"
// "async2"
// "promise1"
// "script end"
// "async1 end"
// "promise2"
// "setTimeout"



// Macro-tasks：宏任务
// Micro-tasks：微任务
// 先清空微任务队列所有任务，再清空宏任务队列所有任务，再去看是否产生新的微任务，再宏任务……直到清空所有任务
// 同步代码本质是T0级别宏任务（所以会有先处理宏任务的说法）

// tsc编译，类型检查
// tsx执行ts文件



async function async1() {
  console.log("async1 start");
  await async2();
  await async3();
  console.log("async1 end");
}

async function async2() {
  console.log("async2");
}

async function async3() {
  console.log("async3");
}

console.log("script start");

setTimeout(function () {
  console.log("setTimeout");
}, 0);

async1();

new Promise(function (resolve) {
  console.log("promise1");
  resolve();
}).then(function () {
  console.log("promise2");
});

console.log("script end");

// error:
// "script start"
// "async1 start"
// "async2"
// "promise1"
// "script end"
// "async3"
// "promise2"
// "setTimeout"
// "async1 end"

// answer:
// "script start"
// "async1 start"
// "async2"
// "promise1"
// "script end"
// "async3"
// "promise2"
// "async1 end"
// "setTimeout"


console.log("S");

setTimeout(() => {
  console.log("T1");
  Promise.resolve().then(() => console.log("m-in-T1"));
}, 0);

Promise.resolve().then(() => {
  console.log("m1");
  queueMicrotask(() => console.log("m2")); // queueMicrotask 是 JavaScript 中一个用于将任务排入微任务队列的 API
});

setTimeout(() => console.log("T2"), 0);

console.log("E");

// error:
// "S"
// "E"
// "m1"
// "m2"
// "T1"
// "T2"
// "m-in-T1"

// answer:
// "S"
// "E"
// "m1"
// "m2"
// "T1"
// "m-in-T1"
// "T2"

// 规则1: 先执行所有同步代码
// 规则2: 清空微任务队列
// 规则3: 执行一个宏任务
// 规则4: 重复2-3

// 重要：每次宏任务执行完后，都会清空微任务队列