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

interface IPromo{
  id: number, 
  title: string, 
  value: number
}


const Cart = () => {
  
  // TODO: Доделать добавление количества товара

  const [items, setItems] = useState(products);
  const [limit, setLimit] = useState(5);
  const [promo, setPromo] = useState('');
  const [activePromo, setActivePromo] = useState<IPromo[]>([]);

  const promoCodeList = [
    {id: 1, title: 'rs', value: 15},
    {id: 2, title: 'epm', value: 10}
  ]
  
  const itemsPerPages = usePagination(items, limit);

  const [subtotal, setSubtotal] = useState(products.reduce((sum, e) => sum + e.price, 0));

  const allItems = items.length;

  const [quantityItems, setQuantityItems] = useState(allItems);
  const quantityPages = itemsPerPages.length;

  const [page, setPage] = useState(1);

  const [subtotalClass, setsubtotalClass] = useState('');

  const sortItems = (quanItems:string | number) => {
    if(typeof quanItems === 'string')
    setLimit(Number(quanItems));
    setPage(1);
  }

  
  const getPromo = promoCodeList.find((e) => e.title === promo);

  const addPromoCode = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if(!getPromo) return;
    const newPromoCode = {
      id: getPromo.id,
      title: getPromo.title,
      value: getPromo.value
    }
    if(!activePromo.some(e => e.id === newPromoCode.id)) {setActivePromo([...activePromo, newPromoCode]);}
    setPromo('');
    setsubtotalClass('old-price');
  }

  const removeActivePromo = (promo: IPromo) => {
    setActivePromo(activePromo.filter(p => {return p.id !== promo.id}))
    if(activePromo.length < 2){
      setsubtotalClass('');
    }
  }

  const removeItem = (item: IProduct) => {
    setItems(items.filter(p => {return p.id !== item.id}));
  }

  const TotalSum = () => {
    return (subtotal * (100 - activePromo.reduce((sum, e) => sum + e.value , 0)) / 100).toFixed(2);
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
              <span className='cart__text'>Subtotal</span>
              <div className={subtotalClass}>${subtotal}</div>
            </div>
            <div className='items cart__line'>
              <span className='cart__text'>Items</span>
              <div className='items__sum'>{quantityItems}</div>
            </div>
            <div className='promo cart__line'>
              <div className='get-promo'>
                <span className='cart__text'>Promo Code</span>
                <Input 
                type='text' 
                placeholder='Enter Code'
                value={promo}
                onChange={e => setPromo(e.target.value.toLowerCase()) }
                />  
              </div>     
              { getPromo
                ?
                <div className='promo__new-code' key={getPromo.id}>
                  <div className='new-code__title'>Apply Code "{getPromo?.title}" - {getPromo?.value}%</div>
                  <button className='new-code__button' onClick={addPromoCode}>add</button>
                </div>
                :
                <></>
                }
              { activePromo
                ?
                activePromo.map((e) => {
                  return(
                  <div key={e.id} className='active-promo promo__new-code'>
                    <div className='new-code__title'>Promo Code "{e.title}" - {e.value}%</div>
                    <button className='new-code__button' onClick={()=>{removeActivePromo(e)}} >del</button>
                  </div>)
                })
                :
                <></>
              }

            </div>
            <div className='total cart__line'>
              <span className='cart__text'>Total</span>
              <div className='total__sum'>${TotalSum()}</div>
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