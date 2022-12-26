import React, { useMemo, useState } from 'react';
import { ProductElement } from '../ProductElement';
import { products } from '../../data';
import { IProduct } from '../../interfaсes';
import { MySelect } from '../MySelect';
import { ItemList } from '../ItemList';
import { Filters } from '../Filters';
import './index.css';
import MyRange from '../MyRange';
import { options } from './options';
import { checkedCatAndBrand, checkPriceFilter, checkStockFilter } from './functions';

let categorySet: Set<string> = new Set();
let categoryArray: string[] = []; 
let brandSet: Set<string> = new Set();
let brandArray: string[] = []; 


export function Found() {  
  
    const [foundProducts, setProducts] = useState(products);
    const [selectSort, setSelectSort] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter]=useState({
     category: '',
     checked: true,
     brand: '', 
     checkBrand: true, 
     priceMin: 0,
     priceMax: 2000,          
     stockMin: 0, 
     stockMax: 160
    });
    

    const sortedItem = useMemo(() => {
      if(selectSort ) {        
        if (selectSort =='titleup') {          
          return ([...foundProducts].sort((a, b) => a['title'] > b['title'] ? 1 : -1))
        }
        if (selectSort =='titledown') {          
          return ([...foundProducts].sort((a, b) => a['title'] < b['title'] ? 1 : -1))
        }
        if (selectSort =='priceup') {
          return ([...foundProducts].sort((a, b) => a['price'] > b['price'] ? 1 : -1))
        }
        if (selectSort =='pricedown') {
          return ([...foundProducts].sort((a, b) => a['price'] < b['price'] ? 1 : -1))
        }
        if (selectSort =='discountPercentageup') {
          return ([...foundProducts].sort((a, b) => a['discountPercentage'] > b['discountPercentage'] ? 1 : -1))
        }
        if (selectSort =='discountPercentagedown') {
          return ([...foundProducts].sort((a, b) => a['discountPercentage'] < b['discountPercentage'] ? 1 : -1))
        }
      }
      else return products;
    },
    [selectSort, products]);
    
    const sortedAndSearchedItem = useMemo(() => {
      /* console.log(filter); */
      if(sortedItem)
      return sortedItem.filter(item => 
        item.title.toLowerCase().includes(search) || 
        item.brand.toLowerCase().includes(search) || 
        item.category.toLowerCase().includes(search)||
        item.price.toString().toLowerCase().includes(search)||
        item.rating.toString().toLowerCase().includes(search))
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

      const sortedSearchedAndFilteredItem = checkedCatAndBrand(sortedAndSearchedItem, categoryArray, brandArray);
      console.log('min', filter.priceMin , 'max' ,filter.priceMax );

      const sortedAndFilterPrice = checkPriceFilter(filter.priceMin, filter.priceMax, sortedSearchedAndFilteredItem);  

      return checkStockFilter(filter.stockMin, filter.stockMax, sortedAndFilterPrice);
         
      }      
    }, [filter, sortedAndSearchedItem]);    

    const sortItem = (sort: string) => {
      setSelectSort(sort);     
    }
  
    return (<div className = "container">
        <div className="sort">          
          <input 
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder='поиск ...'
            className="found" 
           />

           <hr style={{margin: '15px'}}/>
           
          <MySelect 
            value={selectSort}
            onChange={sortItem} 
            defaultValue ='сортировка' 
            options = {options}            
          />        
        </div>

        <Filters
        filter={filter}
        setFilter = {setFilter}
        />
        
        <hr style={{margin: '15px'}}/>
        <ItemList items = {sortedSearchedAndFilteredItem as IProduct[]}/>
          
  
            
    </div>);   
  }