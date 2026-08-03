/**
 * 
 * # Challenge Description:
 * increment the number when the button is clicked
 * 
 * # Acceptance Criteria:
 * 1. When you run the app and navigate to /challenge3, you should 
 *    see the number increment when the button is clicked.
 * 2. Must be done using a react hook.
 * 3. use a child component to display the number.
 * 
 */

function Challenge3Child() {
  return (
    <div>0</div>
  )
}

export default function Challenge3() {
  return (
    <div>
      <button className="border-2 border-black p-1">+</button>
      <Challenge3Child />
    </div>
  )
}


