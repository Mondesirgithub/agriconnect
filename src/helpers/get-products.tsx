export async function getProducts() {
  const produits = await fetch("http://127.0.0.1:8000/agriculture/equipements/", {
    method: "GET"
  }) 

  const data = await produits.json();

  return JSON.parse(JSON.stringify(data));
}
