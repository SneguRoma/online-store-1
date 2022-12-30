import { IProduct } from "../../interfaсes"

export const setFilterAndSort = (checkedStockedFiltered: IProduct[]) => {
  if(checkedStockedFiltered.length !== 0){
    checkedStockedFiltered.sort((a, b)=> a.price - b.price)  
  const maxMinPrice = {priceMin: checkedStockedFiltered[0].price, priceMax: checkedStockedFiltered[checkedStockedFiltered.length-1].price}
  return   maxMinPrice;
  }
  return {priceMin: 0, priceMax: 0}
}

export const setMinPriceBound = (min: number, max: number) => {
  return (min === max) ? 'not found' : (min < max) ? min : max
}

export const setMaxPriceBound = (min: number, max: number) => {
  return (min === max) ? ' ' : (min > max) ? min : max
}