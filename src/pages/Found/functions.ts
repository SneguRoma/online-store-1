import { IProduct } from "../../interfaсes"

export const sortItems = (foundProducts: IProduct[], selectSort: string) => {
  if (selectSort === 'titleup') {
    return ([...foundProducts].sort((a, b) => a['title'] > b['title'] ? 1 : -1))
  }
  if (selectSort === 'titledown') {
    return ([...foundProducts].sort((a, b) => a['title'] < b['title'] ? 1 : -1))
  }
  if (selectSort === 'priceup') {
    return ([...foundProducts].sort((a, b) => a['price'] > b['price'] ? 1 : -1))
  }
  if (selectSort === 'pricedown') {
    return ([...foundProducts].sort((a, b) => a['price'] < b['price'] ? 1 : -1))
  }
  if (selectSort === 'discountPercentageup') {
    return ([...foundProducts].sort((a, b) => a['discountPercentage'] > b['discountPercentage'] ? 1 : -1))
  }
  if (selectSort === 'discountPercentagedown') {
    return ([...foundProducts].sort((a, b) => a['discountPercentage'] < b['discountPercentage'] ? 1 : -1))
  }
}

export const checkedCatAndBrand = (sortedAndSearchedItem: IProduct[], categoryArray: string[], brandArray: string[]) => {
  if (categoryArray.length && brandArray.length) {
    return sortedAndSearchedItem.filter(item => (categoryArray.includes(item.category) && brandArray.includes(item.brand)));
  }
  if (categoryArray.length) {
    return sortedAndSearchedItem.filter(item => (categoryArray.includes(item.category)));
  }
  if (brandArray.length) {
    return sortedAndSearchedItem.filter(item => (brandArray.includes(item.brand)));
  }
  return sortedAndSearchedItem;
}

export const checkPriceFilter = (priceMin: number, priceMax: number, sortedSearchedAndFilteredItem: IProduct[]) => {
  
  if (+priceMin <= +priceMax) {
    return sortedSearchedAndFilteredItem.filter(item => (item.price <= priceMax && item.price >= priceMin));
  }
  if (+priceMin > +priceMax) {
    return sortedSearchedAndFilteredItem.filter(item => (item.price >= priceMax && item.price <= priceMin));
  }
  return sortedSearchedAndFilteredItem;
}

export const checkStockFilter = (stockMin: number, stockMax: number, sortedAndFilterPrice: IProduct[]) => {
  
  if (+stockMin <= +stockMax) {
    return sortedAndFilterPrice.filter(item => (item.stock <= stockMax && item.stock >= stockMin));
  }
  if (+stockMin > +stockMax) {
    return sortedAndFilterPrice.filter(item => (item.stock >= stockMax && item.stock <= stockMin));
  }
  return sortedAndFilterPrice;
}


