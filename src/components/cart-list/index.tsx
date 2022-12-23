import CartItem from '../cart-item';
import './index.css';
import { IProduct } from '../../interfaсes';

interface ICartList {
  elements: IProduct[], 
  pages: number, 
  removeItem: (item: IProduct)=>void, 
  setPage: React.Dispatch<React.SetStateAction<number>>,  
  page:number,
  setSubtotal: React.Dispatch<React.SetStateAction<number>>,
  subtotal: number,
  setQuantityItems: React.Dispatch<React.SetStateAction<number>>,
  quantityItems: number
}

const CartList = ({elements, pages, removeItem, setPage,  page, setSubtotal, subtotal, setQuantityItems, quantityItems}: ICartList) => {
  let i = pages + 1;

  if(!elements && page > 1){
    setPage(page - 1);
  }
  
  return(
    <div className='products__list'>
      {
        elements
        ?
        elements.map((item: IProduct) => 
       <CartItem 
       product={item} 
       key={item.id} 
       id={i++} 
       removeItem={removeItem}
       setSubtotal={setSubtotal}
       subtotal = {subtotal}
       quantityItems={quantityItems}
       setQuantityItems={setQuantityItems}
       />
      )
        :
        <div className='empty-cart'>Cart is Empty</div>
      }
    </div>
  );
};

export default CartList;

