import React, { useState } from 'react';
import { IProduct } from '../../interfaсes';
import Button from '../UI/button/Button';
import classes from './index.module.css';

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
    <div className={classes.product}>
    <div className={classes.product__info}>
      <a href="#" className={classes['product-card__image-link__row']}>
        <div className={classes['product__thumbnail']}>
          <div className={classes['product-card__stock']}>{product.stock} Left</div>
          <img src={product.thumbnail} alt="" className={classes['product__img']}/>
        </div>
      </a>
      <div className={classes['product__info-block']}>
        <a href="" className={classes['product-card__title']}>
          <div className={classes['product_title']}>
            {product.title}
          </div>
        </a>
        <div className={classes['product_description']}>
          {product.description}
        </div>
        <div className={classes['product__rate-disc']}>
          <div className={classes['product-card__rating']}>
            <div className={classes['product-card__body']}>
              <div className={classes['product-card__active']} style={{width: `${(ratingStars(product.rating))}%`}}></div>
            </div>
            <div className={classes['product-card__rating-text']}>{product.rating}</div>
          </div>
          {product.discountPercentage && <div className={classes['product__discount']}>Discount: { Math.round(product.discountPercentage)}%</div>}
        </div>
      </div>
    </div>
    <div className={classes['product__price']}>${ product.price }</div>
    <Button className={classes['product-card__add-cart']} style={buttonColor(addCart)} onClick={(e)=>{
        e.preventDefault();
        setAddCart(prev => !prev)}}>
        {!addCart ? `Add to Cart` : `Drop from Cart`}
    </Button>
  </div>
  )
   
  
}