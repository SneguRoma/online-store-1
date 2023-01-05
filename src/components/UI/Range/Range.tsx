import './index.css';
import React from 'react';

interface rangeProps {
  min: number,
  max: number,
  step: number,
  value: number,
  onChange: any,
  className: string 
  onInput:boolean
}

function Range({value, onChange, min, max, step,className, onInput}: rangeProps) {
  return (
    <div className={className}>        
        <input className= 'my-range-slidebar'
          list="tickmarks"
          onInput = {() => true}
          value={value}
          onChange={event => onChange(event.target.value)}
          type="range"          
          name="price" 
          min={min} 
          max={max} 
          step={step}/>                  
    </div>
  )
}

export default Range;