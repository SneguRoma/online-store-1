import React from 'react'
import './index.css';



interface checkBoxProps {
  item: string
  value: string,
  onChange: any
}



function MyCheckbox({item,value, onChange}: checkBoxProps) {  

  return (
    <div className='my-checkbox'>
      <input type="checkbox" id={item} name={item}  onChange={event => onChange(event.target.checked, item)}   />
      <label htmlFor={item}>{item}</label>
    </div>
  )
}

export default MyCheckbox