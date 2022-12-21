
import MyCheckbox from '../MyCheckbox'
import { products } from '../../data';
import React, { useMemo,  useState} from 'react';
/* import { arr } from '../context'; */

interface filterProps {  
  filter: Ifilter
  setFilter: any  
}
interface Ifilter {  
  category: string
  checked: boolean
  categoryArr: string[]
    
}



export const Filters = ({filter, setFilter}: filterProps)  => {
  let categories: Set<string> = new Set();
  const [selectCategory, setselectCategory] = useState('');
  let filterArr = [];
  
  for (let i of products){
    categories.add(i.category);
  }
  let categoryArr = Array.from(categories);
  
  const checked = (check: boolean, item: string, categoryArr: string[]) => {
      /* arr.push( item); */
       setFilter({category: item , check: check,categoryArr: item})
        
      
  }


  return (
    <div>
      <fieldset>
        <legend>Choose your filters:</legend>
        {categoryArr.map((category: string, index: number) => 
          <MyCheckbox item={categoryArr[index]} key = {index} onChange={checked} value = {categoryArr[index]} />)}
        
      </fieldset>
      <div>
        <input type="range" id="volume" name="volume" min="0" max="11" step="1"/>
        <label >Volume</label>
      </div>
    </div>
  )
}
