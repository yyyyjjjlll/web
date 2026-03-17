// 9. // 假设 Parent 组件中还有其他状态、逻辑或组件
//   const Parent = () => {
//     const [count, setCount] = useState(0);
//     // 其它状态逻辑 ...
//     const handleDelete = () => {
//       console.log('delete');
//     };

//     return (
//       <div>
//         {/* 其它兄弟组件 /}
//   *      {/* ... */}

//         <List
//           data={[{ a: 1 }]}
//           number={2}
//           delete={handleDelete}
//           click={() => {}}
//         />

//         {/* ... */}
//       </div>
//     );
//   };
//   请你分析上面这段代码是否存在性能隐患。以下是一些假设条件：
//   - Parent 组件会因为状态变化（如 count）频繁重新渲染；
//   - List 是一个使用了 React.memo 包裹的组件；
//   - List 内部包含复杂的计算逻辑，比如数据处理、虚拟列表、图表等；
//   如有性能问题，请说明优化建议
//   如你认为无需优化，也请说明判断依据

// 7. 请使用 React + TypeScript 设计并实现一个可复用的 Tabs 组件
//   1. 组件应支持多个 Tab，并实现基本的“切换标签 → 展示对应内容”的功能
//   2. 组件的 API、props 类型、数据结构由你自行设计
//   3. 必须体现 TypeScript 类型定义
//   4. 不要求写 CSS，只需编写逻辑和结构（JSX）
//   5. 可以选择受控或非受控的方式，但需要在完成后简单说明你为何这么设计

// interface Tab {
// 	key: string;
// 	title: string;
// 	content: React.ReactNode;
// }

// interface TabProps {
// 	tabList: Tab[];
// 	curTab: Tab["key"];
// 	onChange: (key: string) => void;
// }

// const Tab = (props: TabProps) => {
// 	const { tabList, onChange, curTab } = props;

// 	const handleClick = (e: any) => {
// 		let key = e.currentTarget.dataset.key;
// 		onChange(key);
// 	};

// 	const tabListNode = (
// 		<div>
// 			{tabList.map((tab) => {
// 				return (
// 					<div key={tab.key} onClick={handleClick} data-key={tab.key}>
// 						{tab.title}
// 					</div>
// 				);
// 			})}
// 		</div>
// 	);
// 	const tabContent = tabList.find((tab) => tab.key === curTab)?.content;
// 	return (
// 		<>
// 			{tabListNode}
// 			{tabContent}
// 		</>
// 	);
// };

// 8. 请你实现一个 useDebounce 自定义 Hook
//   1. 该 Hook 接收三个参数
//     1. 回调函数（需要被防抖的逻辑）
//     2. 延迟时间（ms）
//     3. 依赖项数组（类似 useEffect 的 deps）
//   2. 当依赖项数组中的任意值发生变化时，不要立即执行回调函数，而是等待给定延迟时间，如果期间依赖项继续变化，则重新计时，最终仅在依赖项稳定后执行回调一次
//   3. 不需要支持立即执行或取消功能

// type Callback = ()=>void;

// const useDebounce = (fn,time,deps)=>{
// 	const timerRef = useRef(null);
// 	// const prevTime = useRef(null);
// 	useEffect(()=>{
// 		timerRef.current = setTimeout(()=>{
// 			fn();
// 			timerRef.current = null;
// 		},time)
// 		return (()=>{
// 			clearTimeout(timerRef.current);
// 		})
// 	},[deps])
// }

// 4. 请实现一个 once 函数，使得传入的函数 只会被执行一次，之后多次调用都返回第一次执行的结
//   const add = (a, b) => a + b;
//   const onceAdd = once(add);
//   onceAdd(1, 2); // 3
//   onceAdd(5, 6); // 3

// const once = (fn)=>{
// 	let execute = false;
// 	let res;
// 	return (...p)=>{
// 		if(!execute){
// 			execute = true;
// 			res = fn(...p)
// 			return res;
// 		}else{
// 			return res;
// 		}
// 	}
// }

// 5. 请你实现一个 promiseAll 方法，功能与 Promise.all 类似，要求：
//   1. 接收一个 Promise 数组，返回一个新的 Promise
//   2. 当所有 Promise 成功 resolve 时：按原顺序返回结果数组
//   3. 当任意一个 Promise reject 时：立即 reject

// const promiseAll = (generator) => {
// 	return new Promise((resolve, reject) => {
// 		try {
// 			const promiseList = Array.from(generator);
// 			const resList = new Array(promiseList.length).fill(null);
// 			let resolveCount = 0;
// 			promiseList.forEach((item, index) => {
// 				Promise.resolve(item)
// 					.then((res) => {
// 						resolveCount++;
// 						resList[index] = res;
// 						if (resolveCount === promiseList.length) {
// 							resolve(resList);
// 						}
// 					})
// 					.catch((e) => {
// 						reject(e);
// 					});
// 			});
// 		} catch (e) {
// 			reject(e);
// 		}
// 	});
// };
