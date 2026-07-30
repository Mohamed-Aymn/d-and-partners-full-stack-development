function Card() {
  const clickHandler = () => {
    console.log("clicked")
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ color: "red" }}>Title</h1>
      <p style={{ color: "green" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti minus, atque veritatis laudantium voluptatum
        quod asperiores reiciendis beatae rem nam quibusdam nobis cum dolorum perspiciatis, qui nihil molestiae itaque
        placeat.
      </p>
      <p>Hello</p>
      <button onClick={clickHandler}>click me</button>
    </div>
  )
}

export default Card