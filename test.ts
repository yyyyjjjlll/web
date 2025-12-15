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
  // let res: string[][] = [];
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
// 283. 移动零
function moveZeroes(nums: number[]): void {
  // 时间过长，时间复杂度O(n^2)
  // let n = 0 // 注意当nums[n]===0迭代后，nums[n]发生了变化，所以还得从n开始迭代
  // for(let i = 0; i < nums.length; i++){
  //     if(nums[n]===0){
  //         for(let j=n; j<(nums.length-1); j++){
  //             nums[j]=nums[j+1];
  //         }
  //         nums[nums.length-1]=0;
  //     } else {
  //         n++;
  //     }
  // }
  // 时间复杂度O(n)
  let n = 0;
  for(let i = 0; i < nums.length; i++){
      if(nums[i] !== 0){
          nums[n] = nums[i];
          n++;
      }
  }
  // for(let j = n; j < nums.length; j++){
  //     nums[j] = 0;
  // }
  nums.fill(0, n)
};
// 11. 盛最多水的容器
function maxArea(height: number[]): number {
  // 数据量过大导致栈溢出
  // let areas: number[][] = Array.from({length: height.length}, ()=> new Array(height.length).fill(0))
  // // let areas: number[][] = new Array(height.length);
  // // let a: number[] = new Array(height.length);
  // // a.fill(0);
  // // areas.fill(a); // 错误，所有行会引用同一个数组，导致修改一个数组会影响所有行
  // for(let i = 0; i < height.length-1; i++){
  //     for(let j = i+1; j < height.length; j++){
  //         areas[i][j] = Math.min(height[i], height[j])*(j-i)
  //     }
  // }
  // return Math.max(...areas.flat());
  let left = 0;
  let right = height.length - 1;
  let max_area = 0
  while(left < right){
      const area = Math.min(height[left], height[right])*(right - left);
      max_area = Math.max(area, max_area);
      if(height[left] < height[right]){
          left++;
      } else {
          right--;
      }
  }
  return max_area;
};
// 15. 三数之和
function threeSum(nums: number[]): number[][] {
  // 时间复杂度O(n^3)，超时
  // nums.sort();
  // let res: number[][] = [];
  // let x = new Set<number>();
  // for(let i = 0; i < nums.length - 2; i++){
  //     if(x.has(nums[i])){
  //         continue;
  //     } else {
  //         x.add(nums[i])
  //         let y = new Set<number>();
  //         for(let j = i + 1; j < nums.length - 1; j++){
  //             if(y.has(nums[j])){
  //                 continue;
  //             } else {
  //                 y.add(nums[j])
  //                 const a = new Set(nums.slice(j+1, nums.length)); // 时间复杂度O(n)
  //                 if(a.has(0-nums[i]-nums[j])){
  //                     res.push([nums[i],nums[j],0-nums[i]-nums[j]])
  //                 }
  //             }
  //         }
  //     }
  // }
  // return res;
  
};
// 测试函数
function test() {
  const twoDArray = [[1, 5, 2], [8, 3, 10], [4, 9]];
  console.log(twoDArray.flat());
  console.log(...twoDArray);
  // const maxVal = Math.max(...twoDArray.flat()); 
}

test();
console.log("\n========== 测试完成 ==========");

