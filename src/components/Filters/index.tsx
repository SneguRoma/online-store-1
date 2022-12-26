
import MyCheckbox from '../MyCheckbox'
import { products } from '../../data';
import React, { useMemo,  useState} from 'react';
import './index.css';
import { filterProps } from './interface';
import MyRange from '../MyRange';

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

export const Filters = ({filter, setFilter}: filterProps)  => {
   
  const checkedCategory = (check: boolean, item: string) => {      
       setFilter({...filter, category: item , checked: check})     
  }
  const checkedBrand = (check: boolean, item: string) => {    
     setFilter({...filter, brand: item , checkBrand: check})     
  }
  const rangePriceMin = (value: number) => {
    //filter.priceMin = value;    
    setFilter({...filter, priceMin: value})     
    console.log('price' , filter)
  };
  const rangePriceMax = (value: number) => { 
    //filter.priceMax = value;  
    setFilter({...filter, priceMax: value})    
    console.log('priceMax' , filter)
  }; 

  const rangeStockMin = (value: number) => {
    //filter.priceMin = value;    
    setFilter({...filter, stockMin: value})     
    console.log('price' , filter)
  };
  const rangeStockMax = (value: number) => { 
    //filter.priceMax = value;  
    setFilter({...filter, stockMax: value})    
    console.log('priceMax' , filter)
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
      <div className="price-block">
        <MyRange value = {filter.priceMin} min= {priceMin} max = {priceMax} step = {priceSet} onChange = {rangePriceMin} />
        <MyRange value = {filter.priceMax} min= {priceMin} max = {priceMax} step = {priceSet} onChange = {rangePriceMax} />
        <label ><strong>Price     </strong>$</label>
      </div>
      <div className="stock-block">
        <MyRange value = {filter.stockMin} min= {stockMin} max = {stockMax} step = {stockSet} onChange = {rangeStockMin} />
        <MyRange value = {filter.stockMax} min= {stockMin} max = {stockMax} step = {stockSet} onChange = {rangeStockMax} />
        <label ><strong>Stock      </strong>items </label>
      </div>     
    </div>
  )
}
