
const dataFetch = async () => {
  const request = await fetch("https://api.restful-api.dev/objects");

  // console.log(request)

  const data = await request.json();

  // console.log(data)
}









dataFetch();
// console.log("will be printed first!!!")