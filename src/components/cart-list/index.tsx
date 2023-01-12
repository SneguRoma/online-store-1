import React from 'react';
import CartItem from '../cart-item';
import './index.css';
import { IProduct } from '../../interfaсes';
import { useSearchParams } from 'react-router-dom';

interface ICartList {
  elements: IProduct[], 
  pages: number, 
  setPage: React.Dispatch<React.SetStateAction<number>>,  
  page:number,
  setFullCart: React.Dispatch<React.SetStateAction<boolean>>
}

const CartList = ({elements, pages, setPage, page, setFullCart}: ICartList) => {
  let i = pages + 1;

  const [searchParams, setSearchParams] = useSearchParams();
  const key = 'cartPages';

  if(!elements && page > 1){
    setPage(page - 1);
    searchParams.set(key, (page - 1).toString());
    setSearchParams(searchParams);
  }else if(!elements){
    setFullCart(false);
  }

  return(
    <div className='products__list'>
      {
        elements
        ?
        elements.map((item: IProduct) => 
       <CartItem 
       product={item} 
       key={i} 
       id={i++} 
       />
      )
        :
        <></>
      }
    </div>
  );
};

export default CartList;

