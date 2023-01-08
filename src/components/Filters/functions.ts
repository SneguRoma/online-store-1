import { IProduct } from "../../interfaсes"
import { Ifilter } from "./interface";

export const setFilterAndSort = (checkedStockedFiltered: IProduct[], filter?: Ifilter) => {
  if (checkedStockedFiltered.length !== 0) {
    const arrPrice = checkedStockedFiltered.map(item => item.price).sort((a, b) => a - b);
    const arrStock = checkedStockedFiltered.map(item => item.stock).sort((a, b) => a - b);

    const maxMinPrice = {
      priceMin: arrPrice[0],
      priceMax: arrPrice[arrPrice.length - 1],
      stockMin: arrStock[0],
      stockMax: arrStock[arrStock.length - 1],
      found: checkedStockedFiltered.length
    }

    return maxMinPrice;
  }
  return { priceMin: 0, priceMax: 0, stockMin: 0, stockMax: 0, found: 0 }
}

export const setMinBound = (min: number, max: number) => {
  return (+min === +max) ? min : (+min < +max) ? min : max
}

export const setMaxBound = (min: number, max: number) => {  
  return (+min === +max) ? max : (+min > +max) ? min : max
}