export async function getCategories() {

  const categories = await fetch("http://127.0.0.1:8000/agriculture/categories/", {
    method: "GET"
  }) 

  const data = await categories.json()

  return JSON.parse(JSON.stringify(data));
}
