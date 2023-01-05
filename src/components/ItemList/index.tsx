import React from 'react';
import { ProductElement } from '../product';
import { IProduct } from '../../interfaсes';
import './index.css';

interface ItemProps {
  items: IProduct[]
}


export function ItemList({items}: ItemProps) {
  return (<div className="itemlist">
          <div className="itemlist-found">
            {items.map((product: IProduct, index: number) => 
              <ProductElement product={items[index]} key = {items[index].id} />)}
          </div>          
  </div>
    
  )
}
