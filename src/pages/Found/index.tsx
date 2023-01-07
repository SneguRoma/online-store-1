import { useMemo, useState } from 'react';
import { products } from '../../data';
import { IProduct } from '../../interfaсes';
import { Select } from '../../components/UI/select/Select';
import { ItemList } from '../../components/ItemList';
import { Filters } from '../../components/Filters';
import './index.css';
import { options } from './constants';
import { checkedCatAndBrand, checkPriceFilter, checkStockFilter, sortItems } from './functions';
import { setFilterAndSort } from '../../components/Filters/functions';
import React from 'react';
import Button from '../../components/UI/button/Button';
import Header from '../../components/header';	
import Footer from '../../components/footer';	
import gridIcon from '../../images/icons/grid.svg';	
import rowIcon from '../../images/icons/row.svg'	

let categorySet: Set<string> = new Set();
let categoryArray: string[] = []; 
let brandSet: Set<string> = new Set();
let brandArray: string[] = [];
let key = 1;

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

  const resetBounds = setFilterAndSort(products);
  const resetFilters = () => {    
    key +=1
    setFilter({category: '',
      checked: true,
      brand: '', 
      checkBrand: true, 
      priceMin: resetBounds.priceMin,
      priceMax: resetBounds.priceMax,          
      stockMin: resetBounds.stockMin, 
      stockMax: resetBounds.stockMax
    });
    
    brandArray = [];
    categoryArray = [];
    categorySet = new Set();
    brandSet = new Set();
    setSearch('');
    setSelectSort('')
  };
    
  const sortedItem = useMemo(() => {    
    if(selectSort) {    
      return sortItems(foundProducts, selectSort);
    }    
    else return products;
  },
  [selectSort, foundProducts, resetBounds,key]);
    
  const sortedAndSearchedItem = useMemo(() => {  
    if(sortedItem){      
      return sortedItem.filter(item => 
      item.title.toLowerCase().includes(search) || 
      item.brand.toLowerCase().includes(search) || 
      item.category.toLowerCase().includes(search)||
      item.price.toString().toLowerCase().includes(search)||
      item.rating.toString().toLowerCase().includes(search))
    }
    
  }, [search, sortedItem,resetBounds, key]);

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
     /* setBounds.priceMax =filter.priceMax 
    if(setBounds.priceMin < filter.priceMin)  filter.priceMin =setBounds.priceMin */
    const checkedStockedFiltered = checkStockFilter(filter.stockMin, filter.stockMax, sortedAndFilterPrice);
    /* let setBoundsPrice = setFilterAndSort(sortedSearchedAndFilteredItems); */
    /* if(setBoundsPrice.priceMax < filter.priceMax)  filter.priceMax = setBoundsPrice.priceMax
    if(setBoundsPrice.priceMin > filter.priceMin)  filter.priceMin = setBoundsPrice.priceMin
    if(setBoundsPrice.priceMax < filter.priceMin && filter.priceMin > filter.priceMax)  filter.priceMin = setBoundsPrice.priceMax
    if(setBoundsPrice.priceMin > filter.priceMax && filter.priceMax < filter.priceMin)  filter.priceMax = setBoundsPrice.priceMin */
   /*  let setBoundsStock = setFilterAndSort(sortedSearchedAndFilteredItems); */
    /* if(setBoundsStock.stockMax < filter.stockMax)  filter.stockMax = setBoundsStock.stockMax
    if(setBoundsStock.stockMin > filter.stockMin)  filter.stockMin = setBoundsStock.stockMin
    if(setBoundsStock.stockMax < filter.stockMin && filter.stockMin > filter.stockMax)  filter.stockMin = setBoundsStock.stockMax
    if(setBoundsStock.stockMin > filter.stockMax && filter.stockMax < filter.stockMin)  filter.stockMax = setBoundsStock.stockMin */
    /* console.log('filter comout', filter)  */
    return checkedStockedFiltered;         
    }      
  }, [filter, sortedAndSearchedItem,resetBounds,key]);
  
  
  const sortItem = (sort: string | number) => {
    if(typeof sort === 'string') setSelectSort(sort);     
  }
  const [changeDirection, setChangeDirection] = useState(true);
  
    return (
<div className="body">	   
  <Header />	                 
  <main className='main'>	          
    <div className = "container">	            
      <div className='found__wrapper'>	            
        <div className='found__filters-block'>	            
          <Filters
           key ={key}	            
          filter={filter}	          
          setFilter = {setFilter}	                   
          sortedSearchedAndFilteredItem = {sortedSearchedAndFilteredItem as IProduct[]}	          
          /> 
          <div className='filters__clear-save'>
            <Button onClick={resetFilters}>Reset filters</Button>
            <Button>Save filters</Button>
          </div> 
                	            
        </div>	            
        <div className='found__items-block'>	            
          <div className="items-block__sort">          	         
          <Select 	
            value={selectSort}	          
            onChange={sortItem} 	
            defaultValue ='Sorts' 	
            options = {options}             	
          />	
          { (sortedSearchedAndFilteredItem !== undefined &&  sortedSearchedAndFilteredItem.length) 	
            ? 	
            <div className="found__items-quantity">Found: {sortedSearchedAndFilteredItem.length}</div> 	
            : 	
            <div className="found__items-quantity">Items not found</div>	
          }    	
          <input 	
            value={search}	
            onChange={e => setSearch(e.target.value)}	
            placeholder='Search'	
            className="input__found" 	
           />    	
          <div className="direction" onClick={() => setChangeDirection(prev => !prev)}>	
              {changeDirection	
              ?	
              <img src={gridIcon} alt="" />	
              :	
              <img src={rowIcon} alt="" />	
            }	
          </div>    	
        </div>
          <ItemList items = {sortedSearchedAndFilteredItem as IProduct[]}  changeDirection = {changeDirection}/>            	
        </div>	
      </div>	
    </div>	       
  </main>	        
  <Footer />	       
</div>
      


    
    
    );   
}


{/* <div className = "container">
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
        key ={key}
        filter={filter}
        setFilter = {setFilter}
        sortedSearchedAndFilteredItem = {sortedSearchedAndFilteredItem as IProduct[]}
        />        
        <hr style={{margin: '15px'}}/>
        <div className='filters__clear-save'>
          <Button onClick={resetFilters}>Reset filters</Button>
          <Button>Save filters</Button>
        </div>
        <ItemList items = {sortedSearchedAndFilteredItem as IProduct[]} changeDirection ={ true}/>            
    </div> */}