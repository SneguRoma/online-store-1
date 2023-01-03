import { useMemo, useState } from 'react';
import { products } from '../../data';
import { IProduct } from '../../interfaсes';
import { Select } from '../../components/UI/select/Select';
import { ItemList } from '../../components/ItemList';
import { Filters } from '../../components/filters';
import './index.css';
import { options } from './constants';
import { checkedCatAndBrand, checkPriceFilter, checkStockFilter, sortItems } from './functions';
import { setFilterAndSort } from '../../components/filters/functions';

let categorySet: Set<string> = new Set();
let categoryArray: string[] = []; 
let brandSet: Set<string> = new Set();
let brandArray: string[] = [];
/* let maxmin = setFilterAndSort(products); */

export function Found() {  
  
  const [foundProducts, setProducts] = useState(products);
  const [selectSort, setSelectSort] = useState('');
  const [search, setSearch] = useState('');
  const [maxminprice, setmaxminprice] = useState(setFilterAndSort(products));
  const [filter, setFilter]=useState({
    category: '',
    checked: true,
    brand: '', 
    checkBrand: true, 
    priceMin: maxminprice.priceMin,
    priceMax: maxminprice.priceMax,          
    stockMin: maxminprice.stockMin, 
    stockMax: maxminprice.stockMax
  });
    
  const sortedItem = useMemo(() => {    
    if(selectSort) {    
      return sortItems(foundProducts, selectSort);
    }    
    else return products;
  },
  [selectSort, foundProducts]);
    
  const sortedAndSearchedItem = useMemo(() => {  
    if(sortedItem){      
      return sortedItem.filter(item => 
      item.title.toLowerCase().includes(search) || 
      item.brand.toLowerCase().includes(search) || 
      item.category.toLowerCase().includes(search)||
      item.price.toString().toLowerCase().includes(search)||
      item.rating.toString().toLowerCase().includes(search))
    }
    
  }, [search, sortedItem]);

  const sortedSearchedAndFilteredItem = useMemo(() => {
    if(sortedAndSearchedItem){
    if (filter.category !== ''){
      if(filter.checked) categorySet.add(filter.category);
      else categorySet.delete(filter.category);      
    } 
    categoryArray = Array.from(categorySet)     
    if (filter.brand !== ''){
      if(filter.checkBrand) brandSet.add(filter.brand);
      else brandSet.delete(filter.brand);
    } 
    brandArray = Array.from(brandSet);

    const sortedSearchedAndFilteredItems = checkedCatAndBrand(sortedAndSearchedItem, categoryArray, brandArray);   

    const sortedAndFilterPrice = checkPriceFilter(filter.priceMin, filter.priceMax, sortedSearchedAndFilteredItems);
   
    const checkedStockedFiltered = checkStockFilter(filter.stockMin, filter.stockMax, sortedAndFilterPrice);
   
 
      
    return checkedStockedFiltered;         
    }      
  }, [filter, sortedAndSearchedItem]);
  
  
    const sortItem = (sort: string | number) => {
      if(typeof sort === 'string') setSelectSort(sort);     
    }
  
    return (
    <div className = "container">
        <div className="sort">          
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='поиск ...'
            className="found" 
           />
          <hr style={{margin: '15px'}}/>           
          <Select 
            value={selectSort}
            onChange={sortItem} 
            defaultValue ='сортировка' 
            options = {options}
                        
          />        
        </div>
        <Filters
        filter={filter}
        setFilter = {setFilter}
        sortedSearchedAndFilteredItem = {sortedSearchedAndFilteredItem as IProduct[]}
        />        
        <hr style={{margin: '15px'}}/>
        <ItemList items = {sortedSearchedAndFilteredItem as IProduct[]}/>            
    </div>);   
  }