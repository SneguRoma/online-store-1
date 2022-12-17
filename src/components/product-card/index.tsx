import { useState } from "react";
import { IProduct } from "../../interfaсes"
import './index.css';

interface ProductProps {
  product: IProduct;
}

export function Product (props: ProductProps) {
  const handleClick: React.MouseEventHandler<HTMLImageElement> = e => {
    setSrc(e.currentTarget.src);
  }

  const [src, setSrc] = useState(props.product.images[0]);
  
  return (
    <section className="section__card">
      <div className='container'>
        <div className="breadcrumbs">
            Store 
            <i className="fa-regular fa-angle-right"></i> 
            { props.product.category } 
            <i className="fa-regular fa-angle-right"></i> 
            { props.product.brand } 
            <i className="fa-regular fa-angle-right"></i> 
            { props.product.title }
          </div>
        <form className='card__form'>
          <div className="card__pictures">
            <div className="card__pictures__main">
              <img src={ src } alt="" className="picture__main"/>
            </div>
            <div className="card__pictures__thumbnails">
              {props.product.images.filter((e, index)=> index < 3).map(item=> <div className="card__pictures_thumbnail"><img src={ item } alt="" className="pictures__thumbnail" onClick={handleClick}/></div>)}
            </div>
            
          </div>
          <div className="card__info">
            <h2 className='card__title'>{ props.product.title }</h2>
            <span className="card__price">${ props.product.price }</span>
            <span className="card__rating">Rating: { props.product.rating }</span>
            <ul className="card__meta">  
              <li className="card__meta__item"><span>In stock: { props.product.stock }</span></li>
              <li className="card__meta__item"><span>Sales { Math.round(props.product.discountPercentage) }% Off</span></li>
              <li className="card__meta__item"><span>By { props.product.brand }</span></li>
            </ul>
            <h4 className="description__title">Description</h4>
            <p className="description">{ props.product.description }</p>
            <span className="category__title">Category: { props.product.category }</span>
            <div className="card__buttons">
              <button className="card__button button__add">Add to Cart</button>
              <button className="card__button button__buy">Buy Now</button>
            </div> 
          </div>
        </form>
      </div>
    </section>
)}