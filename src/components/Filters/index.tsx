
import MyCheckbox from '../../utils/Checkbox'
import { products } from '../../data';
import React, { useMemo,  useState} from 'react';
import './index.css';
import { filterProps } from './interface';
import MyRange from '../../utils/Range';
import { setFilterAndSort, setMinPriceBound, setMaxPriceBound } from './functions';
const priceMin = 0;
const priceMax = 2000;  
const priceSet = 10;
const stockMin = 0;
const stockMax = 160;  
const stockSet = 1;

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
  
  const setPriceBounds = setFilterAndSort(sortedSearchedAndFilteredItem);
  const minPriceBound = setMinPriceBound(setPriceBounds.priceMin, setPriceBounds.priceMax);
  const maxPriceBound = setMaxPriceBound(setPriceBounds.priceMin, setPriceBounds.priceMax);
  
  /* setFilter({...filter, priceMin: hui.priceMin, priceMax: hui.priceMax}) */
   
  const checkedCategory = (check: boolean, item: string) => {      
       setFilter({...filter, category: item , checked: check})     
  };
  const checkedBrand = (check: boolean, item: string) => {    
     setFilter({...filter, brand: item , checkBrand: check})     
  };
  const rangePriceMin = (value: number) => {       
    setFilter({...filter, priceMin: value})    
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

  return (
    <div className='filters'>
      <fieldset className='my-checkbox' >
          <legend>Choose your filters:</legend>
            {categoriesArr.sort().map((category: string, index: number) => 
          <MyCheckbox 
            item={categoriesArr[index]}
            key = {index} 
            onChange={checkedCategory}
            value = {categoriesArr[index]} />)}
      </fieldset>
      <fieldset className='my-checkbox'>
          <legend>Choose your filters:</legend>
            {brandsArr.sort().map((brand: string, index: number) => 
          <MyCheckbox
            item={brandsArr[index]}
            key = {index} 
            onChange={checkedBrand}
            value = {brandsArr[index]} />)}
      </fieldset>
      <div className="range-block price-block">
        <div className="range-values">
          <p className='min-range'> {minPriceBound}</p>
          <p className='max-range'>{maxPriceBound}</p>
        </div>  
        <MyRange 
          value = {/* (filter.priceMin > hui.priceMin) ?  */setPriceBounds.priceMin /* : filter.priceMin */ } 
          min= {priceMin} 
          max = {priceMax} 
          step = {priceSet} 
          onChange = {rangePriceMin} 
          className = 'my-range min-range-slidebar'/>
        <MyRange 
          value = {setPriceBounds.priceMax} 
          min= {priceMin} 
          max = {priceMax} 
          step = {priceSet} 
          onChange = {rangePriceMax} 
          className = 'my-range max-range-slidebar'/>
        <label className="range-block-name"><strong>Price     </strong>$</label>
      </div>
      <div className="range-block stock-block">
        <div className="range-values">
          <p className='min-range'> {(+filter.stockMin < +filter.stockMax) ? filter.stockMin : filter.stockMax}</p>
          <p className='max-range'> {(+filter.stockMin < +filter.stockMax) ? filter.stockMax : filter.stockMin}</p>
        </div>        
        <MyRange
          value = {filter.stockMin}
          min= {stockMin}
          max = {stockMax}
          step = {stockSet}
          onChange = {rangeStockMin}
          className = 'my-range min-range-slidebar'/>
        <MyRange 
          value = {filter.stockMax} 
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
