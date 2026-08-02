import { useState, useContext, createContext } from "react";

// 1. create the context
export const CountContext = createContext<number>(0);

export default function WithoutPropDrilling() {
  const [count, setCount] = useState(0);

  return (
    // 2. Provide the state value to the subtree
    <CountContext.Provider value={count}>
      <div>
        <button onClick={() => setCount(count + 1)}>Increment</button>
        <ChildComponent />
      </div>
    </CountContext.Provider>
  );
}

// 3. Intermediate component no longer needs props!
function ChildComponent() {
  return (
    <div className="border-2 bg-red-500 p-4">
      <GrandChildComponent />
    </div>
  );
}

// 4. Target component consumes context directly
function GrandChildComponent() {
  const count = useContext(CountContext);

  return (
    <div className="border-2 bg-blue-500 p-4 text-white">
      <p>Count: {count}</p>
    </div>
  );
}