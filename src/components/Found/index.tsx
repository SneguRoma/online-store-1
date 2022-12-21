import React, { useMemo, useState } from 'react';
import { ProductElement } from '../ProductElement';
import { products } from '../../data';
import { IProduct } from '../../interfaсes';
import { MySelect } from '../MySelect';
import { ItemList } from '../ItemList';
import { Filters } from '../Filters';
import './index.css';

export function Found() {  
  
    const [foundProducts, setProducts] = useState(products);
    const [selectSort, setSelectSort] = useState('');
    const [search, setSearch] = useState('');
    const [filter, setFilter]=useState({category: '', checked: true, categoryArr: [] });
    let hui: string[] = [];

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
      console.log(filter);
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
      console.log(filter.categoryArr);
      hui.push(filter.category);
      console.log(hui);
      return sortedAndSearchedItem.filter(item => item.category.includes(filter.category)) ;
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
            options = {[
              {value: 'titleup', name: 'by title asc'},
              {value: 'titledown', name: 'by title desc'}, 
              {value: 'priceup', name: 'by price asc'},
              {value: 'pricedown', name: 'by price desc'},
              {value: 'discountPercentageup', name: 'by discountPercentage asc'},
              {value: 'discountPercentagedown', name: 'by discountPercentage desc'}
            ]}            
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