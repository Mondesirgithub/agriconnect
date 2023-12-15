export async function getProducts() {
  const produits = await fetch("https://agriconnectapi.pythonanywhere.com/agriculture/equipements/", {
    method: "GET"
  }) 

  const data = await produits.json();

  return JSON.parse(JSON.stringify(data));
}
