const function1 = () => console.log('yes')

// 防抖，防抖是指在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
function debounce(fun: Function, wait: number){
    console.log('yes')
    let timeoutid: any;
    return function(...args: any[]){
        // 校验
        if(timeoutid){
            clearTimeout(timeoutid);
        }

        timeoutid = setTimeout(()=>{
            fun(...args)
        }, wait)
    }
}
const debouncehandler = () => {debounce}
window.addEventListener('resize', debouncehandler)

// 节流，节流是指规定在单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次能生效。
function throttle(fun: Function, wait: number){
    let lasttime = 0;
    let timeoutid: any = null;
    return function(...args: any[]){
        // 清除之前的定时器
        if (timeoutid) {
            clearTimeout(timeoutid);
            timeoutid = null;
        }
        const nowtime = Date.now();
        const timeSinceLast = nowtime - lasttime;
        if(timeSinceLast>wait){
            lasttime=nowtime;
            fun(...args)
        }else{
            setTimeout(()=>{
                lasttime=nowtime;
                fun(...args)
            },wait-timeSinceLast)
        }
    }
}
const throttlehandler = () => {debounce}
window.addEventListener('resize', throttlehandler)