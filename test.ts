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
function groupAnagrams(strs: string[]): string[][] {
  let map = new Map<string, string[]>();
  let res: string[][] = [];
  const strs2 = strs.map((str)=>str.split('').sort().join(''))
  for(let i = 0; i < strs.length; i++){
      if(map.has(strs2[i])){
          const a = map.get(strs2[i])!
          // map.set(strs2[i], a.push(i))
          // map.set(strs2[i],a.push(strs[i]) ) 
          // 这种写法是错误的，因为a.push(strs[i]) 返回的是数组的新长度（数字），而不是一个数组，所以不能直接赋值给map
          // .pop() 返回的是数组最后一个元素，所以不能直接赋值给map
          // .shift() 返回的是数组第一个元素，所以不能直接赋值给map
          // .unshift() 返回的是数组的新长度，所以不能直接赋值给map
          map.set(strs2[i], [...a, strs[i]])
      } else {
          // map.set(strs2[i], [i])
          map.set(strs2[i], [strs[i]])
      }
  }
  // for(const v of map.values()){
  //     res.push(v)
  // }
  // return res
  return Array.from(map.values())
};
// 128. 最长连续序列
function longestConsecutive(nums: number[]): number {
  // 时间复杂度O(n log n)
  // // const new_nums = nums.sort(); // nums.sort() 默认按字符串排序，不是数字排序, 会让数字以字符串规则排序
  // const new_nums = nums.sort((a,b) => a-b); // 时间复杂度：O(n log n)
  // if(nums.length === 0){
  //   return 0
  // }
  // let res: number = 1;
  // let l = 1;
  // for(let i = 1; i < nums.length; i++){
  //     if(new_nums[i]-new_nums[i-1] === 1){
  //         l += 1;
  //     } else if(new_nums[i]-new_nums[i-1] !== 0){
  //         res = Math.max(res, l);
  //         l = 1;
  //     }
  // }
  // return Math.max(res, l);
  if(nums.length === 0){
    return 0;
  }
  let a = new Set(nums);
  let res = 1;
  // set的遍历方式是for(const num of a.values())，而不是for(let i = 0; i < a.size; i++)
  for(const num of a.values()){
      if(a.has(num-1)){
          continue;
      } else {
          let l = 1;
          let b = num +1
          while(a.has(b)){
              b+=1;
              l+=1;
          }
          res = Math.max(res, l);
      }
  }
  return res
};

// 测试函数
function test() {
    console.log("测试函数");
}

test
console.log("\n========== 测试完成 ==========");

