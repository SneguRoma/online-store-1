import './index.css';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import CartList from '../cart-list';
import { products } from '../../data';
import { MySelect } from '../UI/select/Select';
import { useState } from 'react';
import usePagination from '../../hooks/usePagination';
import PageSwitcher from '../page-switcher';
import { IProduct } from '../../interfaсes';


const Cart = () => {

  const [limit, setLimit] = useState(5);

  const [items, setItems] = useState(products);

  const removeItem = (item: IProduct) => {
    setItems(items.filter(p => p.id !== item.id));
  }

  const allItems = items.length;

  const itemsPerPages = usePagination(items, limit);
  const quantityPages = itemsPerPages.length;


  const [page, setPage] = useState(1);

  const sortItems = (quanItems:string | number) => {
    if(typeof quanItems === 'string')
    setLimit(Number(quanItems));
  }

  const quantityCallback = (page:number) => {
    setPage(page - 1);
  }

  return(
    <section className='section-cart'>
      <div className='container'>
        <div className='cart'>
          <div className='cart__products'>
            <div className='products__nav'>
              <h4 className='cart__title'>Your Cart</h4>
              <div className='cart__pages'>
                <PageSwitcher quantityPages={quantityPages} pageNum = {quantityCallback}/>
                <MySelect 
                  options={[
                    {value: 5, name: '5'},
                    {value: 10, name: '10'},
                    {value: 25, name: '25'},
                    {value: allItems, name: 'All'}
                  ]} 
                  defaultValue={'Show items'} 
                  value={limit} 
                  onChange={sortItems}
                />
              </div>
              
            </div>
            {items.length !== 0
              ? <CartList elements={itemsPerPages[page]} pages = {(page) * limit} removeItem = {removeItem} />
              : <div className='empty-cart'>Cart is Empty</div>
            } 
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
              <Input type='text'></Input>
            </div>
            <div className='total cart__line'>
              <span>Total</span>
              <div className='total__sum'>$123</div>
            </div>
            <Button>Process to Checkout</Button>
          </form>
          </div>
          
        </div>
      </div>
    </section>
  )
};

export default Cart;