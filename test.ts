/**
 * 前端测试脚本
 * 运行方式: npx ts-node test.ts 或 npx tsx test.ts
 */

// ============== 工具函数 ==============
// 1. 两数之和
function twoSum(nums: number[], target: number): number[] {
  let map = new Map<number, number>()
  for(let i = 0; i < nums.length; i++){
    const a = target - nums[i]
    if(map.has(a)){
      return [map.get(a)!, i] // ! 符号的作用是‌非空断言操作符‌（Non-null assertion operator），它告诉编译器或解释器：“我确信这个值不会为 null（或 None）”，并强制将其视为非空值。‌
    }
    map.set(nums[i], i)
  }
  return []
}
// 49. 字母异位词分组


// 测试函数
function test() {
    console.log("测试函数");
}

test
console.log("\n========== 测试完成 ==========");

