import { IProduct } from "../../interfaсes"

export const checkedCatAndBrand = (sortedAndSearchedItem: IProduct[], categoryArray: string[], brandArray: string[]) => {
  if(categoryArray.length && brandArray.length) {        
    return sortedAndSearchedItem.filter(item => (categoryArray.includes(item.category)&& brandArray.includes(item.brand))) ;
  }
  if(categoryArray.length) {        
    return sortedAndSearchedItem.filter(item => (categoryArray.includes(item.category))) ;
  }
  if(brandArray.length) {        
    return sortedAndSearchedItem.filter(item => (brandArray.includes(item.brand))) ;
  }
  return sortedAndSearchedItem;   
}

export const checkPriceFilter = (priceMin: number, priceMax: number, sortedSearchedAndFilteredItem: IProduct[]) => {  
  console.log('minim', priceMin , 'maxim' ,priceMax )
  
  if(+priceMin === +priceMax) {return []}
  if(+priceMin < +priceMax) {
    console.log('priceMin <<<<< priceMax')
    return sortedSearchedAndFilteredItem.filter(item => (item.price < priceMax && item.price > priceMin));
   } 
  if(+priceMin > +priceMax) {
    console.log('priceMin >>>>>> priceMax')
    return sortedSearchedAndFilteredItem.filter(item => (item.price > priceMax && item.price < priceMin));
  }  
  return sortedSearchedAndFilteredItem;
}

export const checkStockFilter = (stockMin: number, stockMax: number, sortedAndFilterPrice: IProduct[]) => {  
  console.log('minim', stockMin , 'maxim' ,stockMax )
  
  if(+stockMin === +stockMax) {return []}
  if(+stockMin < +stockMax) {
    console.log('stockMin <<<<< stockMax')
    return sortedAndFilterPrice.filter(item => (item.stock < stockMax && item.stock > stockMin));
   } 
  if(+stockMin > +stockMax) {
    console.log('stockMin >>>>>> stockMax')
    return sortedAndFilterPrice.filter(item => (item.stock > stockMax && item.stock < stockMin));
  }  
  return sortedAndFilterPrice;
}
  