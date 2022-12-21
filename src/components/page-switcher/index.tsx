import { useEffect, useState } from 'react';
import './index.css';

const PageSwitcher = (props:{quantityPages: number, pageNum: (arg0: number) => void}) => {

  const [quantity, setQuantity] = useState(1);

  function increment(){
    if(quantity < props.quantityPages)setQuantity(quantity + 1);
  }

  function decrement(){
    if(quantity > 1) setQuantity(quantity - 1);
  }

  useEffect(() => {
    props.pageNum(quantity);
  }, );

  return(
  <div className='pages__switch'>
    <div className='switch left-arrow fa-solid fa-arrow-left' onClick={decrement}></div>
    <div className='quantity__number'>{quantity}</div>
    <div className='switch right-arrow fa-solid fa-arrow-right' onClick={increment}></div>
  </div>
    
  );
};

export default PageSwitcher;

