import React from 'react';
import { useEffect } from 'react';
import { ISwitcher } from '../../interfaсes';
import './index.css';

const PageSwitcher = ({quantityPages, setPage, page}:ISwitcher) => {

  function increment(){
    if(page < quantityPages)setPage(page + 1);
  }

  function decrement(){
    if(page > 1) setPage(page - 1);
  }

  useEffect(()=>{
    setPage(page);
  })

  return(
  <div className='pages__switch'>
    <div className='switch left-arrow fa-solid fa-arrow-left' onClick={decrement}></div>
    <div className='quantity__number'>{page}</div>
    <div className='switch right-arrow fa-solid fa-arrow-right' onClick={increment}></div>
  </div>
    
  );
};

export default PageSwitcher;

