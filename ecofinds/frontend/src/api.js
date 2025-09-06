// src/api.js
import BASE_URL from "./config";

export async function getProducts() {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
}
