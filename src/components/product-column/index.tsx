import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct, useAppSelector } from '../../interfaсes';
import { deleteItemFromCart, setItemInCart } from '../../redux/cart/reducer';
import Button from '../UI/button/Button';
import './index.css';

interface ProductProps {
  product: IProduct
}

export function ProductElement({product}: ProductProps){

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

  const items = useAppSelector((state) => state.cart.itemsInCart);
  const dispatch = useDispatch();

  const addItems = () => {
    dispatch(setItemInCart(product))
  }

  const removeItems = () => {
    dispatch(deleteItemFromCart(product))
  }

  useEffect(()=>{
    if(items.find(elem =>  elem.id === product.id)){ setAddCart(true)};
  })

  return (    
    <div className='product-card'>    
      <Link to={`/items/${product.id}`} className='product-card__image-link'>
        {(product.discountPercentage) && <div className='product-card__discount'>{Math.round(product.discountPercentage)}% Off</div>}
        <div className='product-card__stock'>{product.stock} Left</div>
        <div className='product-card__image__wrapper'>
          <div className='product-card__image' style={{backgroundImage: `url(${product.thumbnail})`}}></div>
          <Button className='product-card__add-cart' style={buttonColor(addCart)} onClick={(e)=>{
            e.preventDefault();
            !addCart ? addItems() : removeItems();
            setAddCart(prev => !prev)}}>

            {!addCart ? `Add to Cart` : `Drop from Cart`}
          </Button>
        </div>
      </Link>
      <div className="product-card__info">
        <Link to={`/items/${product.id}`} className='product-card__title'>
          {product.title}
        </Link>
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