function get_c_str(s){
  if(s.length < 2) return s.length
  let n = 1
  let left = 0
  let right = 1
  let set = new Set()
  set.add(s[0])
  while(right < s.length){
    if(!set.has(s[right])){
      set.add(s[right])
      n = Math.max(n, right-left+1)
      right++
    } else {
      set.delete(s[left])
      left++
    }
  }
  return n
}


function subarraySum(nums: number[], k: number): number {
    let sum = new Array(nums.length+1).fill(0)
    for (let i = 0; i < nums.length; i++) {
        sum[i+1] = sum[i] + nums[i]
    }
    let map = new Map()
    let res = 0
    for(const s of sum){
        res += map.get(s-k) || 0
        map.set(s, (map.get(s) || 0)+1)
    }
    return res
};