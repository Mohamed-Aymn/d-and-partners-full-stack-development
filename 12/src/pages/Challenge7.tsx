/**
 * 
 * # Challenge Description:
 * render the data that exists in the list.
 * 
 * # Acceptance Criteria:
 * 1. When you run the app and navigate to /challenge7, 
 * 2. Use the Item component.
 * 
 */


function Item() {
  return (
    <div>
      <div>title must be rendered here</div>
      <p>description must be rendered here</p>
    </div>
  )
}

export default function Challenge7() {
  const data = [
    {
      title: "this is the first line",
      description: "this is the first line description"
    },
    {
      title: "this is the second line",
      description: "this is the second line description"
    },
    {
      title: "this is the third line",
      description: "this is the third line description"
    },
  ]

  return (
    <div className="ml-28">
      {/* render items here */}
    </div>
  )
}

