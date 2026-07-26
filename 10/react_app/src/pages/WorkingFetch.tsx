import { useEffect, useState } from "react";

function WorkingFetch() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("https://dummyjson.com/posts");
      const responseBody = await response.json();
      console.log(responseBody)
      setData(responseBody.posts)
    }
    fetchData();
  }, [])
  // })

  return (
    <div>
      <h1>Working Fetch</h1>
      {/* conditional rendering */}
      {data.length > 0 ?
        data.map((item: any) => (
          <p key={item.id}>{item.title}</p>
        )) :
        (
          <div>Loading</div>
        )
      }
    </div>
  )
}

export default WorkingFetch