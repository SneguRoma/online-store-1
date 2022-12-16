import { IProduct } from "../../interfaсes"
import './index.css';

interface ProductProps {
  product: IProduct;
}

export function Product (props: ProductProps) {
  return <form className=''>
    <h2 className=''>{ props.product.title }</h2>
    <div>{ props.product.brand}</div>
    <div>{ props.product.price }</div>
    <div>{ props.product.rating }</div>
    <div>{ props.product.stock }</div>
    <div>{ props.product.discountPercentage }</div>
    <div>{ props.product.category}</div>
    <div>{ props.product.description}</div>
  </form>
}