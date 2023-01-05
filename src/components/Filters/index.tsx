import React from 'react';
import { products } from '../../data';
import './index.css';
import Range from '../UI/Range/Range';
import { setFilterAndSort, setMinBound, setMaxBound } from './functions';
import { priceMin, priceMax, priceSet, stockMin, stockMax, stockSet} from './constans';
import Checkbox from '../UI/Checkbox/Checkbox';
import { filterProps } from './interface';
import { useMemo } from 'react';

let categoriesArr: string[] = [];
if (categoriesArr.length === 0) {
  for (let i of products){      
    if (!categoriesArr.includes(i.category)) categoriesArr.push(i.category)
  }
}

let brandsArr: string[] = [];
if (brandsArr.length === 0) {
  for (let i of products){
    if (!brandsArr.includes(i.brand)) brandsArr.push(i.brand);
  }  
}    


export const Filters = ({filter, setFilter, sortedSearchedAndFilteredItem}: filterProps)  => {
  
  const setBounds = setFilterAndSort(sortedSearchedAndFilteredItem);
  const minPriceBound = setMinBound(setBounds.priceMin, setBounds.priceMax);
  const maxPriceBound = setMaxBound(setBounds.priceMin, setBounds.priceMax);
  const minStockBound = setMinBound(setBounds.stockMin, setBounds.stockMax);
  const maxStockBound = setMaxBound(setBounds.stockMin, setBounds.stockMax);
  
  
  let valuePMin = (setBounds.priceMin === 0 || setBounds.priceMin > filter.priceMin)? filter.priceMin : setBounds.priceMin
  console.log('valuePMin', valuePMin)
  const checkedCategory = (check: boolean, item: string) => {      
       setFilter({...filter,category: item , checked: check}) 

       /* valuePMin = setFilterAndSort(sortedSearchedAndFilteredItem).priceMin;
       console.log('valuePMin', valuePMin) */
  };
  const checkedBrand = (check: boolean, item: string) => {    
     setFilter({...filter, brand: item , checkBrand: check})     
  };
  const rangePriceMin = (value: number) => { 
         
    setFilter({...filter, priceMin: value})
    valuePMin = (setBounds.priceMin === 0 || setBounds.priceMin > filter.priceMin)? filter.priceMin : setBounds.priceMin    
  };
  const rangePriceMax = (value: number) => {     
    setFilter({...filter, priceMax: value})    
  };
  const rangeStockMin = (value: number) => {    
    setFilter({...filter, stockMin: value})    
  };
  const rangeStockMax = (value: number) => {    
    setFilter({...filter, stockMax: value})    
  }; 


  let priceCheck = false;
/* 
  let setValuePriceMin = setBounds.priceMin;
  let setValuePriceMax = setBounds.priceMax;
  let setValueStockMin = setBounds.stockMin;
  let setValueStockMax = setBounds.stockMax;
  useMemo(() => {
    setValuePriceMin = filter.priceMin;
    setValueStockMin = setBounds.stockMin;
    setValueStockMax = setBounds.stockMax;    
  },
  [ rangePriceMin]);  
  useMemo(() => {
    setValuePriceMax = filter.priceMax; 
    setValueStockMin = setBounds.stockMin;
    setValueStockMax = setBounds.stockMax;    
  },
  [ rangePriceMax]);
  
  useMemo(() => {
    setValueStockMin = filter.stockMin;
    setValuePriceMin = setBounds.priceMin;
    setValuePriceMax = setBounds.priceMax;    
  },
  [ rangeStockMin]);  
  useMemo(() => {
    setValueStockMax = filter.stockMax; 
    setValuePriceMin = setBounds.priceMin;
    setValuePriceMax = setBounds.priceMax;    
  },
  [ rangeStockMax]);  */
    

  return (
    <div className='filters'>
      <fieldset className='my-checkbox' >
          <legend>Choose your filters:</legend>
            {categoriesArr.sort().map((category: string, index: number) => 
          <Checkbox 
            item={categoriesArr[index]}
            key = {index}            
            onChange={checkedCategory}
            sortedArray = {sortedSearchedAndFilteredItem}
            value = {'category'/* categoriesArr[index] */} />)}
      </fieldset>
      <fieldset className='my-checkbox'>
          <legend>Choose your filters:</legend>
            {brandsArr.sort().map((brand: string, index: number) => 
          <Checkbox
            item={brandsArr[index]}
            key = {index} 
            onChange={checkedBrand}
            sortedArray = {sortedSearchedAndFilteredItem}
            value = {'brand'/* sArr[index] */} />)}
      </fieldset>
      <div className="range-block price-block">
        <div className="range-values">
          <p className='min-range'> {minPriceBound}</p>
          <p className='max-range'>{maxPriceBound}</p>
        </div>  
        <Range 
          value = {valuePMin} 
          onInput = {priceCheck}
          min= {priceMin} 
          max = {priceMax} 
          step = {priceSet} 
          onChange = {rangePriceMin} 
          className = 'my-range min-range-slidebar'/>
        <Range 
          value = {setBounds.priceMax === 0 ? filter.priceMax : setBounds.priceMax}
          onInput = {priceCheck}
          min= {priceMin} 
          max = {priceMax} 
          step = {priceSet} 
          onChange = {rangePriceMax} 
          className = 'my-range max-range-slidebar'/>
        <label className="range-block-name"><strong>Price     </strong>$</label>
      </div>
      <div className="range-block stock-block">
        <div className="range-values">
          <p className='min-range'> {minStockBound}</p>
          <p className='max-range'> {maxStockBound}</p>
        </div>        
        <Range
          value = {filter.stockMin}
          onInput = {priceCheck}
          min= {stockMin}
          max = {stockMax}
          step = {stockSet}
          onChange = {rangeStockMin}
          className = 'my-range min-range-slidebar'/>
        <Range 
          value = {filter.stockMax} 
          onInput = {priceCheck}
          min= {stockMin} 
          max = {stockMax} 
          step = {stockSet} 
          onChange = {rangeStockMax} 
          className = 'my-range max-range-slidebar'/>
        <label className="range-block-name"><strong>Stock      </strong>items </label>
      </div>     
    </div>
  )
}
