import React from 'react'


interface checkBoxProps {
  item: string
  value: string,
  onChange: any
}



function MyCheckbox({item,value, onChange}: checkBoxProps) {  

  return (
    <div>
      <input type="checkbox" id={item} name={item}  onChange={event => onChange(event.target.checked, item)}   />
      <label htmlFor={item}>{item}</label>
    </div>
  )
}

export default MyCheckbox