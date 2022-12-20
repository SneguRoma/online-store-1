import React from 'react'
import { ProductElement } from '../ProductElement'
import { IProduct } from '../../interfaсes'

interface ItemProps {
  items: IProduct[]
}


export function ItemList({items}: ItemProps) {
  return (<div className="itemlist">
    
          {items.map((product: IProduct, index: number) => 
          <ProductElement product={items[index]} key = {items[index].id} />)}
  </div>
    
  )
}
