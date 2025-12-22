const function1 = () => console.log('yes')

function debounce(fun, wait){
    console.log('yes')
    let timeoutid;
    return function(...args){
        clearTimeout(timeoutid);
        timeoutid = setTimeout(()=>{
            fun
        }, wait)
    }
}

window.addEventListener('resize', debounce(function1, 250))