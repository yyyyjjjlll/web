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
  // nums.sort(); // 这是默认字符串排序，不是数字排序
  nums.sort((a,b) => a-b); // 时间复杂度O(n log n)
  let res: number[][] = [];
  for(let i = 0; i < nums.length - 2; i++){
      if(i > 0 && nums[i] === nums[i-1]){
          continue;
      }
      let left = i+1;
      let right = nums.length-1;
      while(left < right){
          if(left > i+1 && nums[left] === nums[left-1]){
              left++;
              continue;
          }
          if(right < nums.length-1 && nums[right] === nums[right+1]){
              right--;
              continue;
          }
          const sum = nums[i]+nums[left]+nums[right]
          if(sum===0){
              res.push([nums[i],nums[left],nums[right]])
              left++;
              right--;
          } else if(sum<0){
              left++;
          } else {
              right--;
          }
      }
  }
  return res;

};
// 42. 接雨水
function trap(height: number[]): number {
  // 超时（当max_height过大时，耗时过多）
  // const max_height: number = Math.max(...height);
  // let res = 0;
  // for(let i = 1; i <= max_height; i++){
  //     let left = 0;
  //     let right = height.length-1;
  //     while(left<right){
  //         if(height[left]<i){
  //             left++;
  //         }
  //         if(height[right]<i){
  //             right--;
  //         }
  //         if(height[left]>=i && height[right]>=i){
  //             break;
  //         }
  //     }
  //     res += get_area(i, left, right, height)
  // }
  // return res;
  // // 动态规划
  // let res = 0;
  // let left_max = [];
  // let right_max = [];
  // left_max[0] = height[0];
  // right_max[height.length-1] = height[height.length-1];
  // for(let i = 1; i < height.length - 1; i++){
  //     left_max[i] = Math.max(left_max[i-1], height[i])
  //     right_max[height.length-1-i] = Math.max(right_max[height.length-i], height[height.length-1-i])
  // }
  // for(let i = 1; i < height.length - 1; i++){
  //     const a = Math.min(left_max[i],right_max[i])
  //     res += Math.max(a-height[i],0)
  // }
  // return res;
  // 双指针法
  let res = 0;
  let left = 0,right = height.length-1;
  let left_max = height[0], right_max = height[height.length-1];
  while(left<right){
      left_max=Math.max(left_max,height[left])
      right_max=Math.max(right_max,height[right])
      if(left_max<right_max){
          res += left_max-height[left]
          left++
      } else {
          res += right_max-height[right]
          right--
      }
  }
  return res;
}
// function get_area(x, left, right, height: number[]): number {
//   if(left===right){
//       return 0;
//   }
//   let area = 0;
//   for(let i = left+1; i < right; i++){
//       if(height[i]<x){
//           area++;
//       }
//   }
//   return area
// }
// 3. 无重复字符的最长子串
function lengthOfLongestSubstring(s: string): number {
    // 时间复杂度O(n^2)
    // const strs = s.split('');
    // if(strs.length===0) return 0
    // if(strs.length===1) return 1
    // let res = [];
    // for(let i = 0; i < strs.length-1; i++){
    //     let set = new Set();
    //     set.add(strs[i]);
    //     for(let j = i+1; j<strs.length; j++){
    //         if(set.has(strs[j])){
    //             res.push(j-i)
    //             break;
    //         } else if(j===strs.length-1) {
    //             res.push(j-i+1)
    //         } else {
    //             set.add(strs[j]);
    //         }
    //     }
    // }
    // return Math.max(...res)
    // 时间复杂度O(n)
    if(s.length<2) return s.length
    let left = 0,right = 0
    let res = 1;
    let set = new Set();
    while(right<s.length){
        if(set.has(s[right])){
            set.delete(s[left])
            left++;
        } else {
            set.add(s[right])
            res = Math.max(res, right-left+1)
            right++;
        }
    }
    return res
};
// 438. 找到字符串中所有字母异位词
function findAnagrams(s: string, p: string): number[] {
    let res: number[] = [];
    let map = new Map();
    for(let i = 0; i < p.length; i++){
        if(map.has(p[i])){
            map.set(p[i], map.get(p[i])+1)
        } else {
            map.set(p[i], 1)
        }
    }
    let left: number = 0, right: number = 0;
    let map2 = new Map();
    while(right<s.length && left<=(s.length-p.length)){
        if(!map.has(s[right])){
            left = right+1;
            right++;
            map2.clear();
        } else {
            const n1 = map.get(s[right]);
            const n2 = map2.get(s[right]) || 0
            if(n2 < n1){
                map2.set(s[right], n2+1)
                if(right-left+1===p.length){
                    res.push(left);
                    map2.set(s[left],map2.get(s[left])-1)
                    left++;
                }
                right++;
            } else {
                map2.set(s[left],map2.get(s[left])-1)
                left++;
            }
        }
    }
    return res;
};
// 560. 和为K的子数组
function subarraySum(nums: number[], k: number): number {
    let sum = 0, res=0;
    let map = new Map();
    if(nums.length === 0) return 0
    for(let i =0; i< nums.length; i++){
        sum += nums[i]
        if(sum === k){res++}
        if(map.has(sum-k)){
            res+=map.get(sum-k) 
        } 
        if(map.has(sum)){
            map.set(sum, map.get(sum)+1)
        } else {
            map.set(sum,1)
        }
    }
    return res
    // if(nums.length === 0) return 0
    // let sum = new Array(nums.length).fill(0)
    // let map = new Map<number, number[]>();
    // let res = 0;
    // sum[0] = nums[0]
    // for(let i =1; i< nums.length; i++){
    //     sum[i] = sum[i-1] + nums[i]
    // }
    // for(let i =0; i< nums.length; i++){
    //     if(sum[i] === k){
    //         res++;
    //     }
    //     if(map.has(sum[i]-k)){
    //         res += map.get(sum[i]-k).length;
    //     }
    //     if(map.has(sum[i])){
    //         map.set(sum[i], [...map.get(sum[i]),i]);
    //     } else {map.set(sum[i], [i])}
    // }
    // return res
};
// 239. 滑动窗口最大值
function maxSlidingWindow(nums: number[], k: number): number[] {
    let res: number[] = [];
    let queue: number[] = [];
    for(let i = 0; i < nums.length; i++){
        while(queue.length>0 && nums[i]>nums[queue[queue.length-1]]){
            queue.pop()
        }
        queue.push(i)
        if(queue[0]<i-k+1){
            queue.shift()
        }
        if(i>=k-1){
            res.push(nums[queue[0]])
        }
    }
    return res
    // let res = [];
    // let queue = [];
    // for(let i = 0; i < nums.length; i++){
    //     for(let j = queue.length -1; j>-1; j--){
    //         if(queue[j]<nums[i]){
    //             queue.pop()
    //         } else { break }
    //     }
    //     queue.push(nums[i])
    //     if(i>=k && queue[0]===nums[i-k]){
    //         queue.shift()
    //     }
    //     if(i>=k-1){
    //         res.push(queue[0])
    //     }
    // }
    // return res
    // class Queue {
    //     private queue: number[];
    //     constructor(){
    //         this.queue = [];
    //     }
    //     enqueue(value: number){
    //         for(let i = this.queue.length-1; i > -1; i--){
    //             if(this.queue[i]<value){
    //                 this.queue.pop()
    //             } else {
    //                 break;
    //             }
    //         }
    //         this.queue.push(value)
    //     }
    //     dequeue(value: number){
    //         if(this.queue[0] === value){
    //             this.queue.shift();
    //         }
    //     }
    //     top(){
    //         return this.queue[0]
    //     }
    // }
    // let queue = new Queue();
    // let res = new Array();
    // for(let i = 0; i < k; i++){
    //     queue.enqueue(nums[i])
    // }
    // res.push(queue.top())
    // for(let i = k; i < nums.length; i++){
    //     queue.enqueue(nums[i]);
    //     queue.dequeue(nums[i-k]);
    //     res.push(queue.top())
    // }
    // return res
};
// 76. 最小覆盖子串
function minWindow(s: string, t: string): string {
    if(s.length < t.length) return ''
    let map = new Map<string, number>()
    for(let i=0; i<t.length; i++){
        map.set(t[i], (map.get(t[i]) || 0) +1)
    }
    let left = 0, right = 0;
    let min_left=0, min_right=Infinity;
    let type_num = map.size;

    while(right<s.length){
        const char = s[right];
        if(map.has(char)){
            const a = map.get(s[right])
            map.set(char, a!-1)
            if(a === 1){
                type_num--;
            }
        }
        right++
        while(type_num===0){
            if((min_right-min_left)>(right-left)){
                min_right = right;
                min_left = left;
            }
            if(map.has(s[left])){
                const b = map.get(s[left])!
                map.set(s[left], b!+1)
                if(b===0){
                    type_num++;
                }
            }
            left++;
        }
    }
    const res = min_right-min_left>s.length ? '' : s.substring(min_left, min_right)
    return res
};
// 53. 最大子数组和
function maxSubArray(nums: number[]): number {
    if(nums.length === 1) return nums[0]
    let res = -Infinity, sum = 0, pre_min_sum = 0
    for(let num of nums){
        pre_min_sum = Math.min(pre_min_sum, sum)
        sum += num;
        res = Math.max(sum-pre_min_sum, res)
    }
    return res;
    // if(nums.length === 1) return nums[0]
    // // let sum_list: number[] = new Array(nums.length).fill(0);
    // let left_min = 0, right_max = -Infinity;
    // let left = 0, right = 0, res = 0;
    // let sum = 0, sum_left_min = 0;
    // // for(let i = 0; i < nums.length; i++){
    // //     sum_list[i] = (sum_list[i-1]||0) + nums[i];
    // // }
    // for(let num of nums){
    //     sum += num;
    //     if(right_max <= num){
    //         right_max = Math.max(sum, right_max)
    //         while(left<right){
    //             sum_left_min += nums[left];
    //             left_min = Math.min(sum_left_min, left_min)
    //             left++;
    //         }
    //         res = Math.max(res, right_max - left_min)
    //     }
    //     right++;
    // }
    // return res;
};
// 56. 合并区间
function merge(intervals: number[][]): number[][] {
    intervals.sort((a,b)=>a[0]-b[0]);
    let left = intervals[0][0], right = intervals[0][1];
    let res: number[][] = [];
    for(let i = 0; i < intervals.length; i++){
        if(intervals[i][0]<=right){
            right = Math.max(right, intervals[i][1])
        } else {
            res.push([left, right])
            left = intervals[i][0];
            right = intervals[i][1];
        }
        if(i === intervals.length -1){res.push([left, right])}
    }
    return res;
};
// 189. 轮转数组
function rotate(nums: number[], k: number): void {
    // // 方法一使用额外的数组：时间复杂度O(n)，空间复杂度O(n)
    // const new_k = k % nums.length;
    // let res: number[] = [];
    // for(let i = 0; i < new_k; i++){
    //     res.push(nums[nums.length - (new_k-i)]);
    // }
    // for(let i = new_k; i < nums.length; i++){
    //     res.push(nums[i-new_k]);
    // }
    // // nums = res; 修改引用只在内部有效，函数内修改数组元素会改变原数组，但重新赋值数组变量则不会影响外部
    // // 将 res 复制回 nums
    // for (let i = 0; i < nums.length; i++) {
    //     nums[i] = res[i];
    // }
    // 方法二数组翻转：时间复杂度O(n)，空间复杂度O(1)
    k = k % nums.length;
    const reverse = (a: number[], start: number, end: number) => {
        while(start<end){
            let temp = a[start];
            a[start] = a[end];
            a[end] = temp;
            start++;
            end--;
        }
    }
    reverse(nums, 0, nums.length-1);
    reverse(nums, 0, k-1);
    reverse(nums, k, nums.length-1);
};
// 238. 除自身以外数组的乘积
function productExceptSelf(nums: number[]): number[] {
    // 时间复杂度O(n)，空间复杂度O(1)
    let answer: number[] = new Array(nums.length);
    for(let i = 0; i < nums.length; i++){
        answer[i] = (answer[i - 1] ?? 1) * (nums[i-1] ?? 1);
    }
    let t = 1;
    for(let i = 0; i < nums.length; i++){
        t *=  nums[nums.length-i] ?? 1;
        answer[nums.length-1-i] *= t
    }
    return answer;
    // 时间复杂度O(n)，空间复杂度O(n)
    // if(nums.length===0){return []}
    // let pre: number[] = new Array(nums.length);
    // let suf: number[] = new Array(nums.length);
    // let answer: number[] = new Array(nums.length);
    // pre[0] = nums[0]; 
    // suf[nums.length-1] = nums[nums.length-1];
    // for(let i = 1; i < nums.length; i++){
    //     pre[i] = pre[i-1]*nums[i];
    //     suf[nums.length-1-i] = suf[nums.length-i]*nums[nums.length-1-i];
    // }
    // for(let i = 0; i < nums.length; i++){
    //     answer[i] = (pre[i-1] ?? 1)*(suf[i+1] ?? 1)
    // }
    // return answer;
};
// 41. 缺失的第一个正数
function firstMissingPositive(nums: number[]): number {
    let res: number = nums.length+1;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] < 1){
            nums[i] = nums.length + 1;
        }
    }
    for(let i = 0; i < nums.length; i++){
        if(Math.abs(nums[i]) < nums.length + 1){
            nums[Math.abs(nums[i])-1] = -Math.abs(nums[Math.abs(nums[i])-1])
        }
    }
    for(let i = 0; i < nums.length; i++){
        if(nums[i] > 0){
            res = i + 1;
            break;
        }
    }
    return res;
    // 时间复杂度O(n)，空间复杂度O(n)
    // let set = new Set<number>(nums);
    // let res: number = 1;
    // for(let i = 1; i < set.size+2; i++ ){
    //     if(!set.has(i)){
    //         res = i;
    //         break;
    //     }
    // }
    // return res;
};
// 73. 矩阵置零
function setZeroes(matrix: number[][]): void {
    // 时间复杂度O(mn)，空间复杂度O(1)
    let fir_col: Boolean = false;
    for(let i = 0; i < matrix.length; i++){
        if(matrix[i][0] === 0){
            fir_col = true;
            break;
        }
    }
    for(let j = 0; j < matrix[0].length; j++){
        if(matrix[0][j] === 0){
            matrix[0][0] = 0;
            break;
        }
    }
    for(let i = 1; i < matrix.length; i++){
        for(let j = 1; j < matrix[0].length; j++){
            if(matrix[i][j]===0){
                matrix[0][j] = 0;
                matrix[i][0] = 0;
            }
        }
    }
    for(let i = 1; i < matrix.length; i++){
        for(let j = 1; j < matrix[0].length; j++){
            if(matrix[i][0]===0 || matrix[0][j]===0){
                matrix[i][j] = 0;
            }
        }
    }
    for(let j = 0; j < matrix[0].length; j++){
        if(matrix[0][0] === 0){
            matrix[0][j] = 0;
        }
    }
    for(let i = 0; i < matrix.length; i++){
        if(fir_col){
            matrix[i][0]=0;
        }
    }
    // // 时间复杂度：O(mn)，空间复杂度：O(m+n)
    // let raw = new Set<number>();
    // let col = new Set<number>();
    // for(let i = 0; i < matrix.length; i++){
    //     for(let j = 0; j < matrix[0].length; j++){
    //         if(matrix[i][j] === 0){
    //             raw.add(i);
    //             col.add(j);
    //         }
    //     }
    // }
    // for(let i = 0; i < matrix.length; i++){
    //     for(let j = 0; j < matrix[0].length; j++){
    //         if(raw.has(i) || col.has(j)){
    //             matrix[i][j] = 0;
    //         }
    //     }
    // }
};
// 54. 螺旋矩阵
function spiralOrder(matrix: number[][]): number[] {
    let dir: string = 'right';
    let i = 0, j = 0;
    let list: number[] = [matrix[0].length-1, matrix.length-1, 0, 1] //右，下，左，上   
    let res: number[] = [];
    const t = matrix[0].length*matrix.length;
    for(let x = 0; x < t; x++){
        res.push(matrix[i][j]);
        if(dir === 'right'){
            if(j === list[0]){
                dir = 'bottom';
                list[0] -= 1;
                i++;
                continue;
            }
            j++;
            continue;
        }
        if(dir === 'bottom'){
            if(i === list[1]){
                dir = 'left';
                list[1] -= 1;
                j--;
                continue;
            }
            i++;
            continue;
        }
        if(dir === 'left'){
            if(j === list[2]){
                dir = 'top';
                list[2] += 1;
                i--;
                continue;
            }
            j--;
            continue;
        }
        if(dir === 'top'){
            if(i === list[3]){
                dir = 'right';
                list[3] += 1;
                j++;
                continue;
            }
            i--;
            continue;
        }
    }
    return res;
};
// 48. 旋转图像
function rotate2(matrix: number[][]): void {
    const n: number = matrix.length;
    for(let i = 0; i < Math.ceil(n/2); i++){
        for(let j = 0; j < Math.floor(n/2); j++){
            const temp = matrix[i][j];
            matrix[i][j] = matrix[n-1-j][i]
            matrix[n-1-j][i] = matrix[n-1-i][n-1-j];
            matrix[n-1-i][n-1-j] = matrix[j][n-1-i];
            matrix[j][n-1-i] = temp;
        }
    }
};
// 240. 搜索二维矩阵 II
function searchMatrix(matrix: number[][], target: number): boolean {
    // 时间复杂度O(m+n)
    let i = matrix.length-1, j = 0;
    while(i > -1 && j < matrix[0].length){
        const a = matrix[i][j]
        if(a === target) return true;
        if(a > target) i--;
        if(a < target) j++;
    }
    return false;
    // 时间复杂度O(mn)
    // for(let i = 0; i < matrix.length; i++){
    //     if(matrix[i][0] > target){break}
    //     for(let j = 0; j < matrix[0].length; j++){
    //         if(matrix[i][j] > target){break}
    //         if(matrix[i][j] === target){return true}
    //     }
    // }
    // return false;
};
// 160. 相交链表
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 */
class ListNode {
    val: number
    next: ListNode | null
    constructor(val?: number, next?: ListNode | null) {
        this.val = (val===undefined ? 0 : val)
        this.next = (next===undefined ? null : next)
    }
}
function getIntersectionNode(headA: ListNode | null, headB: ListNode | null): ListNode | null {
    let A = headA, B = headB;
    while(A != B){
        A = A === null ? headB : A.next; // 运算顺序： ‘===’， ‘？ ：’， ‘=’
        B = B === null ? headA : B.next;
    }
    return A;
    // let A = headA, B = headB;
    // while(A != B){
    //     if(A === null){
    //         A = headB;
    //     } else {
    //         A = A.next;
    //     }
    //     if(B === null){
    //         B = headA;
    //     } else {
    //         B = B.next;
    //     }
    // }
    // return A;
};
// 206. 反转链表
function reverseList(head: ListNode | null): ListNode | null {
    // 递归方法，时间复杂度：O(n)，空间复杂度：O(n)，空间复杂度主要取决于递归调用的栈空间，最多为 n 层。
    if (head == null || head.next == null) return head
    const res = reverseList(head.next)
    head.next.next = head;
    head.next = null
    return res;
    // 循环方法，时间复杂度：O(n)，空间复杂度：O(1)
    // let pre = null, current = head;
    // while(current){
    //     const next = current.next;
    //     current.next = pre;
    //     pre = current;
    //     current = next;
    // }
    // return pre;
};
// 234. 回文链表
function isPalindrome(head: ListNode | null): boolean {
    // 时间复杂度：O(n)，空间复杂度：O(1)
    function middleNode(head: ListNode | null): ListNode | null{
        let fast = head, slow = head;
        while(slow && slow.next && fast && fast.next){
            slow = slow.next;
            fast = fast.next.next
        }
        return slow;
    }
    function reverseList(head: ListNode | null): ListNode | null{
        let pre = null, current = head;
        while(current){
            const next = current.next;
            current.next = pre;
            pre = current;
            current = next;
        }
        return pre;
    }
    const mn = middleNode(head);
    const l = reverseList(mn);
    let left = head, right = l;
    let res = true;
    while(left && right){
        if(left.val !== right.val){
            res = false;
            break;
        }
        left = left.next;
        right = right.next;
    }
    return res;
    // 时间复杂度：O(n)，空间复杂度：O(n)
    // let list = new Array();
    // let current = head;
    // while(current){
    //     list.push(current.val);
    //     current = current.next;
    // }
    // let left = 0, right = list.length-1;
    // let res = true;
    // while(left < right){
    //     if(list[left] !== list[right]){
    //         res = false;
    //         break;
    //     }
    //     left++;
    //     right--;
    // }
    // return res;
};
// 141. 环形链表
function hasCycle(head: ListNode | null): boolean {
    // 时间复杂度：O(n)，空间复杂度：O(1)
    let slow = head, fast = head;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(fast === slow){
            return true;
        }
    }
    return false;
    // 时间复杂度：O(n)，空间复杂度：O(n)
    // let set = new Set<ListNode>();
    // let l = head;
    // while(l){
    //     if(set.has(l)){
    //         return true
    //     }
    //     set.add(l)
    //     l = l.next;
    // }
    // return false;
};
// 142. 环形链表 II
function detectCycle(head: ListNode | null): ListNode | null {
    // 时间复杂度：O(n)，空间复杂度：O(1)
    let slow = head, fast = head;
    let meet = null;
    while(fast && fast.next){
        slow = slow.next;
        fast = fast.next.next;
        if(slow === fast){
            meet = slow;
            break;
        }
    }
    if(!meet) return null;
    let slow2 = head;
    while(slow !== slow2){
        slow = slow.next;
        slow2 = slow2.next;
    }
    return slow;
    // 时间复杂度：O(n)，空间复杂度：O(n)
    // let set = new Set<ListNode>();
    // let l = head;
    // while(l){
    //     if(set.has(l)){
    //         return l
    //     }
    //     set.add(l)
    //     l = l.next;
    // }
    // return null;
};
// 21. 合并两个有序链表
function mergeTwoLists(list1: ListNode | null, list2: ListNode | null): ListNode | null {
    // 方法二：递归，时间复杂度O(n+m)，空间复杂度O(n+m)
    if(list1 === null) return list2;
    if(list2 === null) return list1;
    if(list1.val <= list2.val){
        list1.next = mergeTwoLists(list1.next, list2);
        return list1;
    } else {
        list2.next = mergeTwoLists(list1, list2.next);
        return list2;
    }
    // 方法一：递归，时间复杂度O(n+m)，空间复杂度O(1)
    // let n1next = list1, n2next = list2;
    // if(list1 === null) return list2;
    // if(list2 === null) return list1;
    // const head = new ListNode(-Infinity);
    // let res = head;
    // while(n1next && n2next){
    //     if(n1next.val <= n2next.val){
    //         res.next = n1next;
    //         n1next = n1next.next;
    //     } else {
    //         res.next = n2next;
    //         n2next = n2next.next;
    //     }
    //     res = res.next
    // }
    // res.next = n1next ? n1next : n2next;
    // return head.next;
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