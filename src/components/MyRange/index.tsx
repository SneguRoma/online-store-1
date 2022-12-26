import React from 'react'

interface rangeProps {
  min: number,
  max: number,
  step: number,
  value: number,
  onChange: any,
 
}

function MyRange({value, onChange, min, max, step}: rangeProps) {
  return (
    <div id="my-range" >
        <p className="my-range-value">{value}</p>
        <input 
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

export default MyRange