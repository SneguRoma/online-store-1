import { products } from "../../data";

export const priceMin = products.sort((a, b) => a.price - b.price)[0].price;
export const priceMax = products.sort((a, b) => a.price - b.price)[products.length - 1].price;
export const priceSet = 1;
export const stockMin = products.sort((a, b) => a.stock - b.stock)[0].stock;;
export const stockMax = products.sort((a, b) => a.stock - b.stock)[products.length - 1].stock;
export const stockSet = 1;