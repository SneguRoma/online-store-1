import './index.css';

interface rangeProps {
  min: number,
  max: number,
  step: number,
  value: number,
  onChange: any,
  className: string 
}

function Range({value, onChange, min, max, step,className}: rangeProps) {
  return (
    <div className={className}>        
        <input className= 'my-range-slidebar'
          list="tickmarks"
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