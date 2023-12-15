export async function getCategories() {

  const categories = await fetch("https://agriconnectapi.pythonanywhere.com/agriculture/categories/", {
    method: "GET"
  }) 

  const data = await categories.json()

  return JSON.parse(JSON.stringify(data));
}
