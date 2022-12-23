import './index.css';
import Button from '../UI/button/Button';
import Input from '../UI/input/Input';
import CartList from '../cart-list';
import { products } from '../../data';
import { Select } from '../UI/select/Select';
import { useState } from 'react';
import usePagination from '../../hooks/usePagination';
import PageSwitcher from '../page-switcher';
import { IProduct } from '../../interfaсes';


const Cart = () => {

  const [items, setItems] = useState(products);
  const [limit, setLimit] = useState(5);
  const itemsPerPages = usePagination(items, limit);

  const [subtotal, setSubtotal] = useState(products.reduce((sum, e) => sum + e.price, 0));

  const allItems = items.length;

  const [quantityItems, setQuantityItems] = useState(allItems);
  const quantityPages = itemsPerPages.length;

  const [page, setPage] = useState(1);

  const sortItems = (quanItems:string | number) => {
    if(typeof quanItems === 'string')
    setLimit(Number(quanItems));
    setPage(1);
  }


  const removeItem = (item: IProduct) => {
    setItems(items.filter(p => {return p.id !== item.id}));
  }

  return(
    <section className='section-cart'>
      <div className='container'>
        <div className='cart'>
          <div className='cart__products'>
            <div className='products__nav'>
              <h4 className='cart__title'>Your Cart</h4>
              <div className='cart__pages'>
                <PageSwitcher quantityPages={quantityPages} setPage = {setPage} page = {page}/>
                <Select 
                  options={[
                    {value: 5, name: '5', id: 1},
                    {value: 10, name: '10', id: 2},
                    {value: 25, name: '25', id: 3},
                    {value: allItems, name: 'All', id: 4}
                  ]} 
                  defaultValue={'Show items'} 
                  value={limit} 
                  onChange={sortItems}
                />
              </div>
              
            </div>

            {<CartList 
            elements={itemsPerPages[page - 1]} 
            pages = {(page - 1) * limit} 
            removeItem = {removeItem} 
            setPage = {setPage} 
            page = {page} key = {page}
            setSubtotal = {setSubtotal}
            subtotal = {subtotal}
            quantityItems={quantityItems}
            setQuantityItems={setQuantityItems}
            />
            } 
          </div>
          <div className='cart-wrapper'>
            <form className='total-cart'>
            <h4 className='summary__title'>Order Summary</h4>
            <div className='subtotal cart__line'>
              <span>Subtotal</span>
              <div className='subtotal__sum'>${subtotal}</div>
            </div>
            <div className='items cart__line'>
              <span>Items</span>
              <div className='items__sum'>{quantityItems}</div>
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