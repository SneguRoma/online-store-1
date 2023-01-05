import React from 'react';
import { ProductElement } from '../product-column';
import { IProduct } from '../../interfaсes';
import './index.css';
import { ProductRowElement } from '../product-row';

interface ItemProps {
  items: IProduct[],
  changeDirection: boolean;
}


export function ItemList({items, changeDirection}: ItemProps) {
  return (
  <div className="itemlist">
    <div className="itemlist-found">
      {changeDirection
      ?
      items.map((product: IProduct, index: number) => 
        <ProductElement product={items[index]} key = {items[index].id} />)
      :
      items.map((product: IProduct, index: number) => 
        <ProductRowElement product={items[index]} key = {items[index].id} />)
      }
    </div>          
  </div>
    
  )
}
