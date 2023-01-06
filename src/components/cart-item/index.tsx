import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { IProduct } from '../../interfaсes';
import './index.css';

interface ProductProps {
  product: IProduct;
  id: number;
  removeItem: (item: IProduct)=>void
}

const CartItem = ({product, id, removeItem}:ProductProps) => {
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.price)

  function increment(){
    if(quantity < product.stock){
      setQuantity(quantity + 1);
      setPrice(price + product.price);
    }
  }
  
  function decrement(){
    if (quantity > 1){
      setQuantity(quantity - 1);
      setPrice(price - product.price);
    }else{
      removeItem(product);
    }
  }

  function ratingStars (rating:number){
    return ((100 * rating) / 5);
  }

  return(
    <div className='product'>
    <div className='product__position'>{ id }</div>
    <div className='product__info'>
      <Link to={`/items/${product.id}`} className='product__thumbnail'>
        <img src={product.thumbnail} alt="" className='product__img'/>
      </Link>
      <div className='product__info-block'>
        <Link to={`/items/${product.id}`} className='product_title'>
          {product.title}
        </Link>
        <div className='product_description'>
          {product.description}
        </div>
        <div className='product__rate-disc'>
          <div className='product__rating'>
            <div className='product__body'>
              <div className='product__active' style={{width: `${(ratingStars(product.rating))}%`}}></div>
            </div>
            <div className='product__rating-text'>{product.rating}</div>
          </div>
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