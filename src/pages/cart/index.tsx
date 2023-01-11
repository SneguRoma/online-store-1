import React from "react";
import './index.css';
import Button from '../../components/UI/button/Button';
import Input from '../../components/UI/input/Input';
import CartList from '../../components/cart-list';
import { Select } from '../../components/UI/select/Select';
import { useEffect, useState } from 'react';
import usePagination from '../../hooks/usePagination';
import PageSwitcher from '../../components/page-switcher';
import { IProduct, useAppSelector } from '../../interfaсes';
import Modal from '../../components/UI/modal-window/Modal';
import Billing from '../../components/billing-card';
import Footer from '../../components/footer';
import Header from '../../components/header';
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../redux/cart/reducer";

interface IPromo{
  id: number, 
  title: string, 
  value: number
}


const Cart = () => {
  
  const items = useAppSelector((state) => state.cart.itemsInCart);

  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(5);
  const [promo, setPromo] = useState('');
  const [modal, setModal] = useState(false);
  const [activePromo, setActivePromo] = useState<IPromo[]>([]);
  const [changeModal, setChangeModal] = useState(false);

  const promoCodeList = [
    {id: 1, title: 'rs', value: 15},
    {id: 2, title: 'epm', value: 10}
  ]
  
  const itemsPerPages = usePagination(items, limit);

  const location = useLocation();
  
  if(location.state){
    useEffect(()=>{
      if(location.state.setModal){
        setModal(true);
      }
    },[])
  }

  const allItems = items.length;

  const quantityPages = itemsPerPages.length;

  const [page, setPage] = useState(1);

  const [fullCart, setFullCart] = useState(true);

  const [subtotalClass, setsubtotalClass] = useState('');

  const sortCartPages = searchParams.get('sortCartPages');
  const numberOfCartPages = searchParams.get('cartPages');

  useEffect(()=>{
    if(sortCartPages){
      setLimit(Number(sortCartPages))
    }
    if(numberOfCartPages){
      setPage(Number(numberOfCartPages));
    }else{
      
    }
  },[])

  const subtotal = items.reduce((sum, e) => {
    if(e.quantity){
      return sum + (e.price * e.quantity)
    }
    return sum + e.price
     }, 0);

  const quantityItems = items.reduce((sum, e) => {
    if(e.quantity){
      return sum + e.quantity
    }
    return  sum
  } , 0);

  const sortItems = (quanItems:string | number) => {
 
    if(typeof quanItems === 'string'){
      setLimit(Number(quanItems));
      searchParams.set('sortCartPages', quanItems);
    }
    setSearchParams(searchParams);
    setPage(1);
    searchParams.set('cartPages', (1).toString());
    setSearchParams(searchParams);
  }

  

  function submitForm (e: React.SyntheticEvent) {
    e.preventDefault();
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
    if(!activePromo.some(e => e.id === newPromoCode.id)) {
      setActivePromo([...activePromo, newPromoCode]);}
    setPromo('');
    setsubtotalClass('old-price');
  }

  const removeActivePromo = (promo: IPromo) => {
    setActivePromo(activePromo.filter(p => {return p.id !== promo.id}))
    if(activePromo.length < 2){
      setsubtotalClass('');
    }
  }

  const TotalSum = () => {
    return (subtotal * (100 - activePromo.reduce((sum, e) => sum + e.value , 0)) / 100).toFixed(2);
  }

  const [time, setTime] = useState(3);
  const [ timerActive, setTimerActive ] = useState(false);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  
   
  useEffect(() => {
    if (time > 0 && timerActive) {
      setTimeout(setTime, 1000, time - 1);
    } else if(time === 0) {
      dispatch(reset());
      setTimerActive(false);
      setModal(false);
      setChangeModal(false);
      navigate('/');
    }
    
  }, [ time, timerActive ]);  

  useEffect(()=>{
    if(changeModal){
      setTimerActive(true);
      setTime(3);
    }
  }, [changeModal])

  const [showPromo, setShowPromo] = useState(false);

  return(
    <div className="body">
      <Header />
      <section className='section-cart'>
        <div className='container'>{}
          <Modal visible={modal} setVisible={setModal}>
            {
              !changeModal
              ?
              <Billing setChangeModal={setChangeModal} />
              :    
              <div className='redirect'>Thanks for you order! Redirect to the store after {time} sec</div>
            }
            
          </Modal>
          {
            fullCart
            ?
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
                  setPage = {setPage} 
                  page = {page} key = {page}
                  setFullCart = {setFullCart}
                />
                } 
              </div>
              <div className='cart-wrapper'>
                <form className='total-cart' onSubmit={submitForm}>
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
                      <span className="get-promo__expample" style = {{opacity: `${(promo) ? 1 : 0}`}}>'rs' or 'epm'</span>
                      <span className='cart__text'>Promo Code</span>
                      <Input 
                      type='text' 
                      placeholder='Enter Code'
                      value={promo}
                      onChange={e => setPromo(e.target.value.toLowerCase() ) 
                      }
                      />  
                    </div>     
                    { getPromo &&
                      <div className='promo__new-code' key={getPromo.id}>
                        <div className='new-code__title'>Apply Code "{getPromo.title}" - {getPromo.value}%</div>
                        <button className='new-code__button' onClick={addPromoCode}>add</button>
                      </div>
                      }
                    { activePromo &&
                      activePromo.map((e) => {
                        return(
                        <div key={e.id} className='active-promo promo__new-code'>
                          <div className='new-code__title'>Promo Code "{e.title}" - {e.value}%</div>
                          <button className='new-code__button' onClick={()=>{removeActivePromo(e)}} >del</button>
                        </div>)
                      })
                    }
                  </div>
                  <div className='total cart__line'>
                    <span className='cart__text'>Total</span>
                    <div className='total__sum'>${TotalSum()}</div>
                  </div>
                  <Button onClick={ () => {setModal(true)}}>Process to Checkout</Button>
                </form>
              </div>
            </div>
            :
            <div className='empty-cart'>Cart is Empty</div>
          } 
        </div>
      </section>
      <Footer />
    </div>
  )
};

export default Cart;

function cartClean(): any {
  throw new Error("Function not implemented.");
}
