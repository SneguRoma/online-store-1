import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { IProduct } from '../../interfaсes';
import { decrement, deleteItemFromCart, increment } from '../../redux/cart/reducer';
import './index.css';

interface ProductProps {
  product: IProduct;
  id: number;
}

const CartItem = ({product, id}:ProductProps) => {

  const dispatch = useDispatch();

  const incrementItems = () => {
    if(product.quantity && product.quantity < product.stock){
      dispatch(increment(product))
    }
  }

  const decrementItems = () => {
    if(product.quantity && product.quantity > 1){
      dispatch(decrement(product))
    }else{
      dispatch(deleteItemFromCart(product))
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
        <div className='dec qtybtn' onClick={decrementItems} >-</div>
        <div className='quantity__number'>{product.quantity }</div>
        <div className='inc qtybtn' onClick={incrementItems}>+</div>
      </div>
    </div>
    <div className='product__subtotal'>${
      product.quantity ? product.quantity * product.price : product.price
      
    }</div>
  </div>
  )
}

export default CartItem;