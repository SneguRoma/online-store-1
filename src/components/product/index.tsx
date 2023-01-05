import React from 'react';
import { IProduct } from '../../interfaсes';
import './index.css';

interface ProductProps {
  product: IProduct
}

export function ProductElement({product}: ProductProps){
  function ratingStars (rating:number){
    return ((100 * rating) / 5);
  }
  return (    
    <div className='product-card'>    
      <a href="#" className='product-card__image-link'>
        {(product.discountPercentage) && <div className='product-card__discount'>{Math.round(product.discountPercentage)}% Off</div>}
        <div className='product-card__stock'>{product.stock} Left</div>
        <div className='product-card__image' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
      </a>
      <div className="product-card__info">
        <div className='product-card__title'>{product.title}</div>
        <div className='product-card__rating'>
          <div className='product-card__body'>
            <div className='product-card__active' style={{width: `${(ratingStars(product.rating))}%`}}></div>
          </div>
          <div className='product-card__rating-text'>{product.rating}</div>
        </div>
        <div className='product-card__price'>${product.price}</div>
        <div className='product-card__category-brand'><span className='product-card__category'>{product.category}</span> by {product.brand}</div>
      </div>
    </div>
  )
   
  
}