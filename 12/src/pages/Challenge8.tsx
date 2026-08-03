/**
 * 
 * # Challenge Description:
 * Pass the state to the ChildComponent2
 * 
 * # Acceptance Criteria:
 * 1. When you run the app and navigate to /challenge8, you should 
 *    see the number increment when the button is clicked.
 * 2. do it with least number of rerenders possible
 * 
 * # Hint
 * you can see the number of rerenders in the browser console, 
 * try to make it as low as possible, it is possible to do it
 * with 1 rerender for the parent component
 * 
 */

import { useRenderCount } from "@/hooks/useRenderCount";
import { useState } from "react";

function ChildComponent2() {
  useRenderCount("Challenge 8 Child 2")
  return (
    <div>render the state here!</div>
  )
}

function ChildComponent1() {
  const [state, setState] = useState(0);
  useRenderCount("Challenge 8 Child 1")
  return (
    <div>
      <button onClick={() => setState(state + 1)}>increment</button>
      <div>
        {state}
      </div>
    </div>
  )
}

export default function Challenge8() {
  useRenderCount("Challenge 8 Parent")
  return (
    <div className="ml-28">
      <ChildComponent1 />
      <ChildComponent2 />
    </div>
  )
}


