import { products } from '../../../data';
import { IProduct } from '../../../interfaсes';
import './index.css';
import React from 'react';

interface checkBoxProps {
  item: string
  value: string,
  onChange: any
  sortedArray: IProduct[]
}

function Checkbox({item,value, onChange, sortedArray}: checkBoxProps) {  
   const itemOnStock = products.filter((i) => i[value] === item).length;
   const itemOnStockFind = sortedArray.filter((i) => i[value] === item).length;
  return (
    <div className='checkbox-block'>
      <input type="checkbox" className='checkbox__button' id={item} name={item} onChange={event => onChange(event.target.checked, item)}   />      
      <label htmlFor={item} className='checkbox__label'>{item}</label>
      <span className="items-on-stock">{itemOnStock + ' / '+ itemOnStockFind}</span>
    </div>
  )
}

export default Checkbox;