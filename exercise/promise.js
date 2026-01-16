const promise = new Promise((resolve, reject)=>{
    // setTimeout(() => resolve('success'), 1000)
    const date = new Date().getTime();
    if(date % 2){
        setTimeout(() => resolve(date), 1000)
    } else {
        setTimeout(() => reject(date), 1000)
    }
})

promise.then((res) =>{
    console.log('yes');
    console.log(res);
}).catch(error => {
   console.error('no');
   console.error(error);
})