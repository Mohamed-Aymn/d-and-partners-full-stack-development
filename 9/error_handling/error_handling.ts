interface Item {
  id: number;
  name: string;
  data: {
    Capacity?: string;
    Generation?: string;
    price?: string;
  }
}

type Data = Item[]


async function dataFetch() {
  try {
    const request = await fetch("https://api.restful-api.dev/objects");

    const data: Data = await request.json();

    data.map((item) => {
      console.log("**********")
      console.log("id:", item.id)
      console.log("name:", item.name)
      console.log("**********")
    })
  } catch (error) {
    console.log("something happened")
  }
}




dataFetch();
console.log("hello")