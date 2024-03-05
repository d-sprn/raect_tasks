import react from "@vitejs/plugin-react";
import {useState} from "react";
import {s} from "vite/dist/node/types.d-jgA8ss1A.js";

export default function Counter () {
    const [count, setCount] = useState(5)
    function increment() {
        setCount(count + 1)
        console.log(count)

    }
    function decrement() {
        setCount(count - 1)
        console.log(count)

    }

    return (
        <div className='App'>
            <h1>{count}</h1>
            <button onClick={increment}>Increment</button>
            <button onClick={decrement}>Decrement</button>
        </div>
    )
}