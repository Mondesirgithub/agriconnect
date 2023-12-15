import config from '../../src/config'

export async function getCategories() {

  const categories = await fetch(`${config.apiUrl}/agriculture/categories/`, {
    method: "GET"
  }) 

  const data = await categories.json()

  return JSON.parse(JSON.stringify(data));
}
