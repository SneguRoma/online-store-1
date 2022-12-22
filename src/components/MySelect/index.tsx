import React from 'react'
import { IProduct } from '../../interfaсes'
import './index.css'; 

interface ProductOpts {
  value: string,
  name: string,
  id?: number
}
interface ProductOptsArr {
  options: ProductOpts[],
  defaultValue: string,
  value: string,
  onChange: any
}



export const MySelect = ({options, defaultValue,value, onChange}: ProductOptsArr) => {
  return (
    <select value={value}
    onChange={event => onChange(event.target.value)}>
      <option disabled value="">{defaultValue}</option>
      {options.map((option:  ProductOpts )=> 
        <option key = {option.id} value = {option.value}>
          {option.name}
        </option>
        )}
    
    </select>
  );
};
