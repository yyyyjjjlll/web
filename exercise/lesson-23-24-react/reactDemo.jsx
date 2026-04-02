import { useState } from "react";

const reactDemo = () => {
    const [count, setCount] = useState(0)
    return (<div>
        <p>{count}</p>
        <button onClick={() => {setCount(++count)}}>点击+</button>
    </div>)
}

export default reactDemo