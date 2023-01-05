import React from 'react';
import { useState } from 'react';
import { IProduct } from '../../interfaсes';
import './index.css';

interface ProductProps {
  product: IProduct;
  id: number;
  removeItem: (item: IProduct)=>void
  setSubtotal: React.Dispatch<React.SetStateAction<number>>,
  subtotal: number,
  setQuantityItems: React.Dispatch<React.SetStateAction<number>>,
  quantityItems: number
}

const CartItem = ({product, id, removeItem, setSubtotal, subtotal, setQuantityItems, quantityItems}:ProductProps) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price)

  function increment(){
    if(quantity < product.stock){
      setQuantity(quantity + 1);
      setPrice(price + product.price);
      setSubtotal(subtotal + product.price);
      setQuantityItems(quantityItems + 1);
    }
  }
  
  function decrement(){
    if (quantity > 1){
      setQuantity(quantity - 1);
      setPrice(price - product.price);
      setSubtotal(subtotal - product.price);
      setQuantityItems(quantityItems - 1);
    }else{
      setQuantityItems(quantityItems - 1);
      setSubtotal(subtotal - product.price);
      removeItem(product);
    }
  }

  return(
    <div className='product'>
    <div className='product__position'>{ id }</div>
    <div className='product__info'>
      <div className='product__thumbnail'>
        <img src={product.thumbnail} alt="" className='product__img'/>
      </div>
      <div className='product__info-block'>
        <div className='product_title'>
          {product.title}
        </div>
        <div className='product_description'>
          {product.description}
        </div>
        <div className='product__rate-disc'>
          <div className='product__rating'>Rating: {product.rating}</div>
          <div className='product__discount'>Discount: { Math.round(product.discountPercentage)}%</div>
        </div>
      </div>
    </div>
    <div className='product__price'>${ product.price }</div>
    <div className='product__quantity'>
      <div className='product__stock'>Stock: {product.stock}</div>
      <div className='product_quan'>
        <div className='dec qtybtn' onClick={decrement}>-</div>
        <div className='quantity__number'>{quantity }</div>
        <div className='inc qtybtn' onClick={increment}>+</div>
      </div>
    </div>
    <div className='product__subtotal'>${price}</div>
  </div>
  )
}

export default CartItem;