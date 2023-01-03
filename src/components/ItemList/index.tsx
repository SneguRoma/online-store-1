import React from 'react'
import { ProductElement } from '../ProductElement'
import { IProduct } from '../../interfaсes'

interface ItemProps {
  items: IProduct[]
}


export function ItemList({items}: ItemProps) {
  return (<div className="itemlist">
          { (items !== undefined &&  items.length) ? 
           <h2 className="emty-found">found {items.length} items </h2> : 
           <h2 className="emty-found"> No products found</h2>}
          <div className="itemlist-found">
            {items.map((product: IProduct, index: number) => 
                      <ProductElement product={items[index]} key = {items[index].id} />)}
          </div>          
  </div>
    
  )
}
