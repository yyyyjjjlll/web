// function get_c_str(s){
//   if(s.length < 2) return s.length
//   let n = 1
//   let left = 0
//   let right = 1
//   let set = new Set()
//   set.add(s[0])
//   while(right < s.length){
//     if(!set.has(s[right])){
//       set.add(s[right])
//       n = Math.max(n, right-left+1)
//       right++
//     } else {
//       set.delete(s[left])
//       left++
//     }
//   }
//   return n
// }


// function subarraySum(nums: number[], k: number): number {
//     let sum = new Array(nums.length+1).fill(0)
//     for (let i = 0; i < nums.length; i++) {
//         sum[i+1] = sum[i] + nums[i]
//     }
//     let map = new Map()
//     let res = 0
//     for(const s of sum){
//         res += map.get(s-k) || 0
//         map.set(s, (map.get(s) || 0)+1)
//     }
//     return res
// };

// 实现带 TTL 的 LRU 缓存，实现 class LRUCache { get(k); set(k,v,ttlMS?) }，容量固定 capacity，支持：LRU 淘汰；TTL 到期自动失效（get 时判定）；set 覆盖时更新过期时间；时间复杂度：get/set 都是 O(1)。
class ListNode{
  constructor(key, value, expireAt, prenode, nextnode){
    this.key = key
    this.value = value || null
    // this.ttlMS = ttlMS || null
    this.expireAt = expireAt
    this.prenode = prenode || null
    this.nextnode = nextnode || null
  }
}
class LRUCache{
  constructor(capacity){
    this.map = new Map()
    this.head = new ListNode('head', 0, null, null, null)
    this.capacity = capacity
    this.tail = new ListNode('tail', 0, null, this.head, null)
    this.head.nextnode = this.tail
  }
  get(k){
    if(!this.map.has(k)){
      return undefined
    }
    const node =this.map.get(k)
    if(!node.expireAt || (node.expireAt > Date.now())){
      this.moveNodetoHead(node)
      return node.value
    } else {
      this.map.delete(k)
      this.removeNode(node)
      return undefined
    } 
  }
  set(k,v,ttlMS){
    if(this.map.has(k)){
      const node =this.map.get(k)
      node.value = v
      node.expireAt = this.getexpireAt(ttlMS)
      this.moveNodetoHead(node)
    } else {
      const node = new ListNode(k,v,this.getexpireAt(ttlMS))
      if(this.map.size < this.capacity){
        this.addNode(node)
      } else {
        const tailpre = this.tail.prenode
        this.removeNode(tailpre)
        this.addNode(node)
      }
    }
  }
  getexpireAt(ttlMS){
    if (ttlMS === null) return null
    return Date.now() + ttlMS
  }
  moveNodetoHead(node){
    this.removeNode(node)
    this.addNode(node)
  }
  removeNode(node){
    const pre = node.prenode
    const next = node.nextnode
    pre.nextnode = next
    next.prenode = pre
    this.map.delete(node.key)
  }
  addNode(node){
    const headnext = this.head.nextnode
    this.head.nextnode = node
    node.prenode = this.head
    node.nextnode = headnext
    headnext.prenode = node
    this.map.set(node.key, node)
  }
}

// const cache = new LRUCache(2);
// cache.set("a", 1);
// cache.set("b", 2); 
// console.log(cache.get("a")); // 1
// cache.set("c", 3); 
// console.log(cache.get("b")); // undefined

const cache = new LRUCache(2);
cache.set("token", "abc123", 1000);
console.log(cache.get("token"));  // 'abc123'

setTimeout(() => {
  console.log(cache.get("token"));  //undefined
}, 1500);