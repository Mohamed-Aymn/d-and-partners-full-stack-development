interface Item {
  id: number;
  name: string;
  data: {
    Capacity?: string;
    Generation?: string;
    price?: string;
    ["Screen size"]?: string;
  }
}

type Data = Item[]

async function dataFetch() {
  const request = await fetch("https://api.restful-api.dev/objects");

  const data: Data = await request.json();

  data.map((item) => {
    console.log("**********")
    console.log("id:", item.id)
    console.log("name:", item.name)
    // console.log(item.data.Capacity.charAt(0))
    console.log("**********")
  })
}




dataFetch();
