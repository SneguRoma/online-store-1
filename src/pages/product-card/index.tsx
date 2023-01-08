import React, { useEffect } from "react";
import { useState } from "react";
import { IProduct, useAppSelector } from "../../interfaсes"
import Button from "../../components/UI/button/Button";
import './index.css';
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { products } from "../../data";
import { useDispatch } from "react-redux";
import { setItemInCart, deleteItemFromCart } from "../../redux/cart/reducer";

export function Product () {
  const handleClick: React.MouseEventHandler<HTMLImageElement> = e => {
    setSrc(e.currentTarget.src);
  }
  let product: IProduct = products[1];
  const id = Number(useParams().id);
  const item = products.find(item => item.id === id);
  if(item){
    product = item;
  }else{
    return <Navigate to={`/404`} />;
  }

  function ratingStars (rating:number){
    return ((100 * rating) / 5);
  }

  const [src, setSrc] = useState(product.images[0]);

  const [addCart, setAddCart] = useState(false);

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

  const navigate = useNavigate();

  
  return (
    <div className="body">
      <Header />
      <section className="section__card">
        <div className='container'>
          <div className="breadcrumbs">
              Store 
              <i className="fa-regular fa-angle-right"></i> 
              { product.category } 
              <i className="fa-regular fa-angle-right"></i> 
              { product.brand } 
              <i className="fa-regular fa-angle-right"></i> 
              { product.title }
            </div>
          <form className='card__form'>
            <div className="card__pictures">
              <div className="card__pictures__main">
                <div className="picture__main" style={{backgroundImage: `url(${src})`}}></div>
              </div>
              <div className="card__pictures__thumbnails">
                {
                  product.images.filter((e, index) =>
                  index < product.images.length ).map((item, idx)=> 
                    <div className="card__pictures_thumbnail" key={idx}>
                      <img src={ item } alt="" className="pictures__thumbnail" onClick={handleClick}/>
                    </div>)
                }
              </div>
            </div>
            <div className="card__info">
              <h2 className='card__title'>{ product.title }</h2>
              <span className="card__price">${ product.price }</span>
              <div className='product-card__rating'>
                <div className='product-card__body'>
                  <div className='product-card__active' style={{width: `${(ratingStars(product.rating))}%`}}></div>
                </div>
                <div className='product-card__rating-text'>{product.rating}</div>
              </div>
              <ul className="card__meta">  
                <li className="card__meta__item"><span>In stock: { product.stock }</span></li>
                <li className="card__meta__item"><span>Sales { Math.round(product.discountPercentage) }% Off</span></li>
                <li className="card__meta__item"><span>By { product.brand }</span></li>
              </ul>
              <h4 className="description__title">Description</h4>
              <p className="description">{ product.description }</p>
              <span className="card__category__title">Category: { product.category }</span>
              <div className="card__buttons">
                <Button className="button__add" style={buttonColor(addCart)} onClick={(e)=>{
                  e.preventDefault();
                  !addCart ? addItems() : removeItems();
                  setAddCart(prev => !prev)}}>
                    {!addCart ? `Add to Cart` : `Drop from Cart`}
                </Button>
                <Button className="button__buy" style={{ backgroundColor: "#FF8F3C"}} onClick={(e)=>{
                  e.preventDefault();
                  !addCart && addItems();
                  setAddCart(prev => !prev)
                  navigate('/cart', {
                    state: {
                      setModal: true,
                    }
                  });
                  }}>
                    Buy Now</Button>
              </div> 
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
)}