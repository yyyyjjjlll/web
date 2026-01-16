const targetNode = document.getElementById('mo')

function callback(mutationsList, observer){
  for (const mutation of mutationsList) {
    console.log('DOM 发生了变化:', mutation);
  }
}

// 创建观察者实例
const observer = new MutationObserver(callback);

// 配置选项
const config = {
  childList: true,           // 监听子节点的添加/删除
  attributes: true,          // 监听属性的变化
  characterData: true,       // 监听文本内容的变化
  subtree: true,             // 监听所有后代节点
  attributeOldValue: true,   // 记录属性旧值
  characterDataOldValue: true, // 记录文本旧值
  attributeFilter: ['class', 'style'] // 只监听特定属性
};
// 开始监控
observer.observe(targetNode, config);


const btn = document.querySelector('button')
btn.onclick = function(){
  if (targetNode.classList.contains('content2')) {
    targetNode.classList.replace('content2', 'content1');
    // 可选：修改按钮文字提示
    btn.textContent = '恢复元素2类名';
  } else {
    targetNode.classList.replace('content1', 'content2');
    btn.textContent = '修改元素2类名';
  }
}