import './index.css';
import { products } from '../../data';
import { IProduct } from '../../interfaсes';

interface ProductProps {
  product: IProduct;
}

const Cart = (props: ProductProps) => {
  return(
    <section className='section-cart'>
      <div className='container'>
        <div className='cart'>
          <div className='cart__products'>
            <div className='products__nav'>
              <h4 className='cart__title'>Your Cart</h4>
              <select className='select'>
                <option className='option'>Show items</option>
                <option className='option'>5</option>
                <option className='option'>10</option>
                <option className='option'>20</option>
              </select>
            </div>
            <div className='products__list'>
              <div className='products'>
                <div className='product'>
                  <div className='product__position'>{ props.product.id }</div>
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
                      <div className='dec qtybtn'>-</div>
                      <div className='quantity__number'>2</div>
                      <div className='inc qtybtn'>+</div>
                    </div>
                  </div>
                  <div className='product__subtotal'>${ props.product.price * 2}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='cart-wrapper'>
            <form className='total-cart'>
            <h4 className='summary__title'>Order Summary</h4>
            <div className='subtotal cart__line'>
              <span>Subtotal</span>
              <div className='subtotal__sum'>$123</div>
            </div>
            <div className='items cart__line'>
              <span>Items</span>
              <div className='items__sum'>23</div>
            </div>
            <div className='promo cart__line'>
              <span>Promo Code</span>
              <input type='text' className='input'></input>
            </div>
            <div className='total cart__line'>
              <span>Total</span>
              <div className='total__sum'>$123</div>
            </div>
            <button className='card__button'>Process to Checkout</button>
          </form>
          </div>
          
        </div>
      </div>
    </section>
  )
};

export default Cart;