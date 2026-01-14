/* 合并左子数组和右子数组 */
function merge(nums: number[], left: number, mid: number, right: number): void {
  // 左子数组区间为 [left, mid], 右子数组区间为 [mid+1, right]
  // 创建一个临时数组 tmp ，用于存放合并后的结果
  const tmp = new Array(right - left + 1);
  // 初始化左子数组和右子数组的起始索引
  let i = left,
    j = mid + 1,
    k = 0;
  // 当左右子数组都还有元素时，进行比较并将较小的元素复制到临时数组中
  while (i <= mid && j <= right) {
    if (nums[i] <= nums[j]) {
      tmp[k++] = nums[i++];
    } else {
      tmp[k++] = nums[j++];
    }
  }
  // 将左子数组和右子数组的剩余元素复制到临时数组中
  while (i <= mid) {
    tmp[k++] = nums[i++];
  }
  while (j <= right) {
    tmp[k++] = nums[j++];
  }
  // 将临时数组 tmp 中的元素复制回原数组 nums 的对应区间
  for (k = 0; k < tmp.length; k++) {
    nums[left + k] = tmp[k];
  }
}

/* 归并排序示例 */
function mergeSort(nums: number[], left: number, right: number): void {
  // 终止条件
  if (left >= right) return; // 当子数组长度为 1 时终止递归
  // 划分阶段
  let mid = Math.floor(left + (right - left) / 2); // 计算中点
  mergeSort(nums, left, mid); // 递归左子数组
  mergeSort(nums, mid + 1, right); // 递归右子数组
  // 合并阶段
  merge(nums, left, mid, right);
}


// 归并排序实践
function sort(nums: number[], left: number, right: number, mid: number): void{
  let i = left, j = mid+1, k = 0;
  let temp: number[] = []
  while(i <= mid && j <= right){
    if(nums[i] <= nums[j]){
      temp[k++] = nums[i++]
    } else {
      temp[k++] = nums[j++]
    }
  }
  while(i <= mid){
    temp[k++] = nums[i++]
  }
  while(j <= right){
    temp[k++] = nums[j++]
  }
  for(let x = 0; x < k; x++){
    nums[left+x] = temp[x]
  }
}
function mergeSort2(nums: number[], left: number, right: number): void{
  if(left>=right) return 
  let mid = Math.floor((right+left)/2)
  mergeSort2(nums, left, mid)
  mergeSort2(nums, mid+1, right)
  sort(nums, left, right, mid)
}




// 测试函数
function test() {
  const twoDArray = [[1, 5, 2], [8, 3, 10], [4, 9]];
  console.log(twoDArray.flat());
  console.log(...twoDArray);
  // const maxVal = Math.max(...twoDArray.flat()); 
}

test();
console.log("\n========== 测试完成 ==========");



class listNode {
  val: number
  next: listNode | null
  constructor(val?: number, next?: listNode | null) {
    this.val = (val === undefined ? 0 : val);
    this.next = (next === undefined ? null : next);
  }
}