// react components cannot be async
async function BrokenFetch() {

  const fetchData = async () => {
    const response = await fetch("https://api.restful-api.dev/objects");
    const data = await response.json();
    return data;
  }

  const data = await fetchData();

  return (
    <div>
      {data.map((item: any) => {
        return (
          <div key={item.id}>
            <div>{item.id}</div>
          </div>
        )
      })}
    </div>
  )
}

export default BrokenFetch