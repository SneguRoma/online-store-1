
import MyCheckbox from '../MyCheckbox'
import { products } from '../../data';
import React, { useMemo,  useState} from 'react';
import './index.css'; 

interface filterProps {  
  filter: Ifilter
  setFilter: any  
}
interface Ifilter {  
  category: string
  checked: boolean 
  brand: string 
  checkBrand: boolean   
}

let categories: Set<string> = new Set();
let categoriesArr = Array();
if (categories.size == 0) {
    for (let i of products){
      categories.add(i.category);
    }
    categoriesArr = Array.from(categories);
  }

let brands: Set<string> = new Set();
let brandsArr = Array();
if (brands.size == 0) {
  for (let i of products){
    brands.add(i.brand);
  }
  brandsArr = Array.from(brands);
}    

export const Filters = ({filter, setFilter}: filterProps)  => {
  /* console.log('filters', categories); */  
  const checkedCategory = (check: boolean, item: string) => {
      /* arr.push( item); */
       setFilter({category: item , checked: check})     
  }
  const checkedBrand = (check: boolean, item: string) => {
    /* arr.push( item); */
     setFilter({brand: item , checkBrand: check})     
}

  return (
    <div className='filters'>
      <fieldset className='my-checkbox' >
        <legend>Choose your filters:</legend>
        {categoriesArr.map((category: string, index: number) => 
          <MyCheckbox 
            item={categoriesArr[index]}
            key = {index} onChange={checkedCategory}
            value = {categoriesArr[index]} />)}
      </fieldset>
      <fieldset className='my-checkbox'>
         <legend>Choose your filters:</legend>
        {categoriesArr.map((brand: string, index: number) => 
          <MyCheckbox
            item={brandsArr[index]}
            key = {index} onChange={checkedBrand}
            value = {brandsArr[index]} />)}
      </fieldset>
      <div>
        <input type="range" id="volume" name="volume" min="0" max="11" step="1"/>
        <label >Volume</label>
      </div>
    </div>
  )
}
