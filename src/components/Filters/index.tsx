import React from 'react';
import { products } from '../../data';
import './index.css';
import Range from '../UI/Range/Range';
import { setFilterAndSort, setMinBound, setMaxBound } from './functions';
import { priceMin, priceMax, priceSet, stockMin, stockMax, stockSet} from './constans';
import Checkbox from '../UI/Checkbox/Checkbox';
import { filterProps } from './interface';
import Button from '../UI/button/Button';

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
  
  const setBounds = setFilterAndSort(sortedSearchedAndFilteredItem, filter);
  const minPriceBound = setMinBound(filter.priceMin, filter.priceMax);
  const maxPriceBound = setMaxBound(filter.priceMin, filter.priceMax);
  const minStockBound = setMinBound(filter.stockMin, filter.stockMax);
  const maxStockBound = setMaxBound(filter.stockMin, filter.stockMax);
  
 
   
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
      <div className='filters__category' >
        <div className='category__title'>Category</div>
        <div className='category__content'>
          {categoriesArr.sort().map((category: string, index: number) => 
            <Checkbox 
              item={categoriesArr[index]}
              key = {index}            
              onChange={checkedCategory}
              sortedArray = {sortedSearchedAndFilteredItem}
              value = {'category'/* categoriesArr[index] */} />)
          }
        </div>
      </div>
      <div className='filters__category'>
        <div className='category__title'>Brand</div>
        <div className='category__content'>
          {brandsArr.sort().map((brand: string, index: number) => 
            <Checkbox
              item={brandsArr[index]}
              key = {index} 
              onChange={checkedBrand}
              sortedArray = {sortedSearchedAndFilteredItem}
              value = {'brand'/* sArr[index] */} />)
          }
        </div>
      </div>
      <div className="range-block">
        <div className='category__title range__title'>Price</div>
        <div className='range__content'>
          <div className="range-values">
            <div className='min-range'> {minPriceBound}</div>
            <div className='max-range'>{maxPriceBound}</div>
          </div> 
          <div className='range__bar'>
            <Range 
              value = {(setBounds.priceMin === 0/*  || setBounds.priceMin < filter.priceMin */)? filter.priceMin : setBounds.priceMin} 
              min = {priceMin} 
              max = {priceMax} 
              step = {priceSet} 
              onChange = {rangePriceMin} 
              className = 'range__line'/>
            <Range 
              value = {(setBounds.priceMax === 0/*  || setBounds.priceMax > filter.priceMax */)? filter.priceMax : setBounds.priceMax} 
              min = {priceMin} 
              max = {priceMax} 
              step = {priceSet} 
              onChange = {rangePriceMax} 
              className = 'range__line'/>
          </div> 
        </div>
      </div>
      <div className="range-block">
        <div className='category__title range__title'>Stock</div>
        <div className='range__content'>
          <div className="range-values">
            <div className='min-range'> {minStockBound}</div>
            <div className='max-range'>{maxStockBound}</div>
          </div> 
          <div className='range__bar'>
            <Range
              value = {(setBounds.stockMin === 0/*  || setBounds.stockMin < filter.stockMin */)? filter.stockMin : setBounds.stockMin}
              min= {stockMin}
              max = {stockMax}
              step = {stockSet}
              onChange = {rangeStockMin}
              className = 'range__line'/>
            <Range 
              value = {(setBounds.stockMax === 0/*  || setBounds.stockMax > filter.stockMax */)? filter.stockMax : setBounds.stockMax} 
              min = {stockMin} 
              max = {stockMax} 
              step = {stockSet} 
              onChange = {rangeStockMax} 
              className = 'range__line'/>
          </div> 
        </div>
      </div>
      <div className='filters__clear-save'>
        <Button>Reset filters</Button>
        <Button>Save filters</Button>
      </div>
    </div>
  )
}
