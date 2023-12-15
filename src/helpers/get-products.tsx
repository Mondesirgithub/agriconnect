import config from '../../src/config'

export async function getProducts() {
  const produits = await fetch(`${config.apiUrl}/agriculture/equipements/`, {
    method: "GET"
  }) 

  const data = await produits.json();

  return JSON.parse(JSON.stringify(data));
}
