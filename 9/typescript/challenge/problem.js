const dataFetch = async () => {
  const request = await fetch("https://api.restful-api.dev/objects");

  // console.log(request)

  const data = await request.json();

  console.log(data)


  // data.map((item) => {
  //   console.log("**********")
  //   console.log("id:", item.id)
  //   console.log("name:", item.name)
  //   console.log("**********")
  // })
}





dataFetch();
