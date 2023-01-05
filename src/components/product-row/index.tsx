import React, { useState } from 'react';
import { IProduct } from '../../interfaсes';
import Button from '../UI/button/Button';
import './index.css';

interface ProductProps {
  product: IProduct
}

export function ProductRowElement({product}: ProductProps){

  const [addCart, setAddCart] = useState(false);

  function ratingStars (rating:number){
    return ((100 * rating) / 5);
  }

  function buttonColor(addCart:boolean){
    let res = {backgroundColor: 'var(--color-primary)'};
    if(addCart){
      return res = {backgroundColor: 'var(--color-secondary)'}
    }else{
      return res = {backgroundColor: 'var(--color-primary)'}
    }
  }


  return (    
    <div className='product'>
    <div className='product__info'>
      <a href="#" className='product-card__image-link__row'>
        <div className='product__thumbnail'>
          <div className='product-card__stock'>{product.stock} Left</div>
          <img src={product.thumbnail} alt="" className='product__img'/>
        </div>
      </a>
      <div className='product__info-block'>
        <a href="" className='product-card__title'>
          <div className='product_title'>
            {product.title}
          </div>
        </a>
        <div className='product_description'>
          {product.description}
        </div>
        <div className='product__rate-disc'>
          <div className='product-card__rating'>
            <div className='product-card__body'>
              <div className='product-card__active' style={{width: `${(ratingStars(product.rating))}%`}}></div>
            </div>
            <div className='product-card__rating-text'>{product.rating}</div>
          </div>
          {product.discountPercentage && <div className='product__discount'>Discount: { Math.round(product.discountPercentage)}%</div>}
        </div>
      </div>
    </div>
    <div className='product__price'>${ product.price }</div>
    <Button className='product-card__add-cart' style={buttonColor(addCart)} onClick={(e)=>{
        e.preventDefault();
        setAddCart(prev => !prev)}}>
        {!addCart ? `Add to Cart` : `Drop from Cart`}
    </Button>
  </div>
  )
   
  
}