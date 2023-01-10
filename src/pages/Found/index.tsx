import { useEffect, useMemo, useState } from 'react';
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
import { useSearchParams } from 'react-router-dom';

let categorySet: Set<string> = new Set();
let categoryArray: string[] = []; 
let brandSet: Set<string> = new Set();
let brandArray: string[] = [];
let key = 1;

export function Found() {  

  const [searchParams, setSearchParams] = useSearchParams();
  
  const [foundProducts, setProducts] = useState(products);
  const [selectSort, setSelectSort] = useState('');
  const [search, setSearch] = useState('');
  const [changeDirection, setChangeDirection] = useState(true);

  const directionExist = searchParams.get('direction');
  const seactExist = searchParams.get('search');
  const selectSortExist = searchParams.get('sort');
  const selectPriceMaxExist = Number(searchParams.get('priceMax'))
  const selectPriceMinExist = Number(searchParams.get('priceMin'))
  const selectStockMaxExist = Number(searchParams.get('stockMax'))
  const selectStockMinExist = Number(searchParams.get('stockMin'))
   

  useEffect(()=>{
    if(directionExist){
      setChangeDirection(JSON.parse(directionExist))
    }
    if(seactExist){
      setSearch(seactExist)
    }
    if(selectSortExist){
      setSelectSort(selectSortExist)
    }
    if(selectPriceMinExist || selectPriceMaxExist){
      setFilter({...filter,priceMax: selectPriceMaxExist, priceMin: selectPriceMinExist})
    }
    if(selectPriceMaxExist && !selectPriceMinExist){
      setFilter({...filter, priceMax: selectPriceMaxExist})
    }
    if(selectPriceMinExist && !selectPriceMaxExist){
      setFilter({...filter, priceMin: selectPriceMinExist})
    }    
    if(selectStockMaxExist){
      filter.stockMax=selectStockMaxExist
    }
    if(selectStockMinExist){
      filter.stockMin = selectStockMinExist      
    }     
  },[])
  
  
  const [maxminprice, setmaxminprice] = useState(setFilterAndSort(products));
  const [filter, setFilter] = useState({
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
    setSearchParams({});
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
    setSearchParams()
  };

  
  const sortedItem = useMemo(() => {   
    if(selectSort) {        
      return sortItems(foundProducts, selectSort);
    }else {
      return products
    };
  },
  [selectSort, foundProducts, resetBounds,key]);
    
  const sortedAndSearchedItem = useMemo(() => {  
    if(sortedItem){      
      return sortedItem.filter(item => 
      item.title.toLowerCase().includes(search) || 
      item.brand.toLowerCase().includes(search) || 
      item.category.toLowerCase().includes(search)||
      item.price.toString().toLowerCase().includes(search)||
      item.rating.toString().toLowerCase().includes(search)||
      item.stock.toString().toLowerCase().includes(search) ||
      item.description.toLowerCase().includes(search) ||
      item.discountPercentage.toString().toLowerCase().includes(search))
    }
    
  }, [search, sortedItem,resetBounds, key]);

  const sortedSearchedAndFilteredItem = useMemo(() => {
    if(sortedAndSearchedItem){
    if (filter.category !== ''){
      if(filter.checked) categorySet.add(filter.category);
      else categorySet.delete(filter.category);      
    } 
    if(searchParams.getAll('category')) categoryArray = searchParams.getAll('category');
    else categoryArray = Array.from(categorySet)    
      
    if (filter.brand !== ''){
      if(filter.checkBrand) brandSet.add(filter.brand);
      else brandSet.delete(filter.brand);
    } 
    if(searchParams.getAll('brand')) brandArray = searchParams.getAll('brand');
    else brandArray = Array.from(brandSet);
   
    const sortedSearchedAndFilteredItems = checkedCatAndBrand(sortedAndSearchedItem, categoryArray, brandArray);      
     
    const sortedAndFilterPrice = checkPriceFilter(filter.priceMin, filter.priceMax, sortedSearchedAndFilteredItems);
    const checkedStockedFiltered = checkStockFilter(filter.stockMin, filter.stockMax, sortedAndFilterPrice);
    return checkedStockedFiltered;         
    }      
  }, [filter, sortedAndSearchedItem,resetBounds,key]);
  
  
  const sortItem = (sort: string | number) => {

    if(typeof sort === 'string') setSelectSort(sort); 
    const key = 'sort';
    searchParams.set(key, sort.toString());
    setSearchParams(searchParams);     
  }

  const [copyUrl, setCopyUrl] = useState(false);

  setTimeout( () => setCopyUrl(false), 1000)

  function buttonColor(copyUrl:boolean){
    let res = {backgroundColor: 'var(--color-primary)'};
    if(copyUrl){
      return res = {backgroundColor: 'var(--color-secondary)'}
    }else{
      return res = {backgroundColor: 'var(--color-primary)'}
    }
  }

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
                <Button style={buttonColor(copyUrl)} onClick={(e) => {
                  e.preventDefault()
                  navigator.clipboard.writeText(window.location.toString())
                  setCopyUrl(true);
                  }}>{!copyUrl ? `Copy link` : `Copied`}</Button>
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
              { (sortedSearchedAndFilteredItem !== undefined) && 
                <div className="found__items-quantity">Found: {sortedSearchedAndFilteredItem.length}</div>
              }    	
              <input 	
                value={search}	
                onChange={e => {    

                  const search = e.target.value;
                  const key = 'search';    

                  if(search){
                    searchParams.set(key, search);
                    setSearchParams(searchParams); 
                  }else{
                    searchParams.delete(key);
                    setSearchParams(searchParams); 
                  }
                  
                  setSearch(e.target.value)}}	
                placeholder='Search'	
                className="input__found" 	
               />    	
              <div className="direction" onClick={() => {    

                setChangeDirection(prev => !prev)
                const key = 'direction';
                searchParams.set(key, (!changeDirection).toString());
                setSearchParams(searchParams);     

                }}>	
                  {changeDirection	
                  ?	
                  <img src={rowIcon} alt="" />	
                  :	
                  <img src={gridIcon} alt="" />	
                }	
              </div>    	
            </div>
            {(sortedSearchedAndFilteredItem !== undefined &&  sortedSearchedAndFilteredItem.length) 	
            ?
            <ItemList items = {sortedSearchedAndFilteredItem as IProduct[]}  changeDirection = {changeDirection}/>
            :
            <div className='empty-found-page'>Items not found</div>
            }
            </div>	
          </div>	
        </div>	       
      </main>	        
      <Footer />	       
    </div>
  );   
}
