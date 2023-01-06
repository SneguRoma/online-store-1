import React from "react";
import { useState } from "react";
import { IProduct } from "../../interfaсes"
import Button from "../../components/UI/button/Button";
import './index.css';
import Footer from "../../components/footer";
import Header from "../../components/header";
import { useParams } from "react-router-dom";
import { products } from "../../data";

export function Product () {
  const handleClick: React.MouseEventHandler<HTMLImageElement> = e => {
    setSrc(e.currentTarget.src);
  }
  let product: IProduct = products[1];
  const id = Number(useParams().id);
  const item = products.find(item => item.id === id);
  if(item){
    product = item;
  }

  const [src, setSrc] = useState(product.images[0]);
  
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
                  index < product.images.length - 1).map((item, idx)=> 
                    <div className="card__pictures_thumbnail" key={idx}>
                      <img src={ item } alt="" className="pictures__thumbnail" onClick={handleClick}/>
                    </div>)
                }
              </div>
            </div>
            <div className="card__info">
              <h2 className='card__title'>{ product.title }</h2>
              <span className="card__price">${ product.price }</span>
              <span className="card__rating">Rating: { product.rating }</span>
              <ul className="card__meta">  
                <li className="card__meta__item"><span>In stock: { product.stock }</span></li>
                <li className="card__meta__item"><span>Sales { Math.round(product.discountPercentage) }% Off</span></li>
                <li className="card__meta__item"><span>By { product.brand }</span></li>
              </ul>
              <h4 className="description__title">Description</h4>
              <p className="description">{ product.description }</p>
              <span className="card__category__title">Category: { product.category }</span>
              <div className="card__buttons">
                <Button className="button__add">Add to Cart</Button>
                <Button className="button__buy" style={{ backgroundColor: "#FF8F3C"}}>Buy Now</Button>
              </div> 
            </div>
          </form>
        </div>
      </section>
      <Footer />
    </div>
)}