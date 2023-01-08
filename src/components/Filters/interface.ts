import { IProduct } from "../../interfaсes"

export interface filterProps {  
  filter: Ifilter
  setFilter: any
  sortedSearchedAndFilteredItem: IProduct[] 
  key: number 
}
export interface Ifilter {  
  category: string
  checked: boolean 
  brand: string 
  checkBrand: boolean 
  priceMax: number
  priceMin: number
  stockMax: number
  stockMin: number    
}