import React from 'react';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ISwitcher } from '../../interfaсes';
import './index.css';

const PageSwitcher = ({quantityPages, setPage, page}:ISwitcher) => {

  const [searchParams, setSearchParams] = useSearchParams();

  const key = 'cartPages';

  function increment(){
    if(page < quantityPages){
      setPage(page + 1);
      searchParams.set(key, (page + 1).toString());
      setSearchParams(searchParams);
    }
  }

  function decrement(){
    if(page > 1) {
      setPage(page - 1);
      searchParams.set(key, (page - 1).toString());
      setSearchParams(searchParams);
    }
  }

  useEffect(()=>{
    setPage(page);
  }, [])



  return(
  <div className='pages__switch'>
    <div className='switch left-arrow fa-solid fa-arrow-left' onClick={decrement}></div>
    <div className='quantity__number'>{page}</div>
    <div className='switch right-arrow fa-solid fa-arrow-right' onClick={increment}></div>
  </div>
    
  );
};

export default PageSwitcher;

