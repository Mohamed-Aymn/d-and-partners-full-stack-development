import { useState } from "react"
/**
 * 
 * # Challenge Description:
 * Do conditional rendering
 * 
 * # Acceptance Criteria:
 * 1. When you run the app and navigate to /challenge5, you should 
 *    see the number increment when the button is clicked.
 * 2. when the number is greater than 5, 
 *     you should see a text "greater than 5" below the number, otherwire
 *     you should see a text "less than or equal to 5" below the number.
 * 
 */

export default function Challenge5() {
  const [state, setState] = useState(0);

  return (
    <div>
      <button
        onClick={() => setState(state + 1)}
        className="border-2 border-black p-1"
      >
        +
      </button>

      <div>{state}</div>

      <div>xxxx than 5</div>
    </div>
  )
}

