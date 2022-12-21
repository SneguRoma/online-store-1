import CartItem from '../cart-item';
import './index.css';
import { IProduct } from '../../interfaсes';

const CartList = (props:{elements: IProduct[], pages: number, removeItem: (item: IProduct)=>void}) => {
  let i = props.pages + 1;

  // TODO: Исправить работу пагинации


  return(
    <div className='products__list'>
      {
        props.elements
        ?
        props.elements.map((item: IProduct) => 
       <CartItem product={item} key={i} id={i++} removeItem={props.removeItem}/>
      )
        :
        <div className='title'>Вернитесь на 1 страницу</div>
      }
    </div>
  );
};

export default CartList;

