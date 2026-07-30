interface Item {
  id: string;
  name: string;
  data?: {
    Capacity: string;
    Price: string | number;
    Generation?: string;
  }
}

const dataFetch = async () => {
  const request = await fetch("https://api.restful-api.dev/objects");

  const data = await request.json();

  console.log(data)

  data.map((item: Item) => {
    console.log("**********")
    console.log("id:", item.id)
    console.log("name:", item.name)
    console.log("**********")
  })
}



dataFetch();


