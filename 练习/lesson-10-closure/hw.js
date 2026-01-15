function apiFn(method, baseurl){
    return function (path){
        fetch(baseurl+path, {method}).then(res=>{
            console.log(res)
        }).catch(error=>{
            console.log(error)
        })
    }
}

const fn1 = apiFn('get', 'http://v1.yiketianqi.com')
fn1('/free/day')
fn1('/free/week')


const partialFun = (fn, ...preset) => {
    return (...rest) => {
        return fn(...preset, ...rest)
    }
}
const fetchFun = (baseUrl, path) => fetch(baseUrl + path);
const apiFun = partialFun(fetchFun, "https://api.example.com/");
apiFun("/login");