import { useState } from "react";

export default function WithPropDrilling() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
      <ChildComponent count={count} />
    </div>
  )
}

function ChildComponent({ count }: { count: number }) {
  return (
    <div className="border-2 bg-red-500 p-4">
      <GrandChildComponent count={count} />
    </div>
  )
}

function GrandChildComponent({ count }: { count: number }) {
  return (
    <div className="border-2 bg-blue-500 p-4 text-white">
      <p>Count: {count}</p>
    </div>
  )
}