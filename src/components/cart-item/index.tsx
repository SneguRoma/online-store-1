import { useEffect, useState } from 'react';
import { IProduct } from '../../interfaсes';
import './index.css';

interface ProductProps {
  product: IProduct;
  id: number;
  removeItem: (item: IProduct)=>void
}

const CartItem = (props: ProductProps) => {
  const [quantity, setQuantity] = useState(1);

  function increment(){
    if(quantity < props.product.stock)setQuantity(quantity + 1);
  }
  
  function decrement(){
    if (quantity > 1){
      setQuantity(quantity - 1);
    }else{
      props.removeItem(props.product);
    }
  }

  return(
    <div className='product'>
    <div className='product__position'>{ props.id }</div>
    <div className='product__info'>
      <div className='product__thumbnail'>
        <img src={props.product.thumbnail} alt="" className='product__img'/>
      </div>
      <div className='product__info-block'>
        <div className='product_title'>
          {props.product.title}
        </div>
        <div className='product_description'>
          {props.product.description}
        </div>
        <div className='product__rate-disc'>
          <div className='product__rating'>Rating: {props.product.rating}</div>
          <div className='product__discount'>Discount: { Math.round(props.product.discountPercentage)}%</div>
        </div>
      </div>
    </div>
    <div className='product__price'>${ props.product.price }</div>
    <div className='product__quantity'>
      <div className='product__stock'>Stock: {props.product.stock}</div>
      <div className='product_quan'>
        <div className='dec qtybtn' onClick={decrement}>-</div>
        <div className='quantity__number'>{quantity}</div>
        <div className='inc qtybtn' onClick={increment}>+</div>
      </div>
    </div>
    <div className='product__subtotal'>${props.product.price * quantity}</div>
  </div>
  )
}

export default CartItem;