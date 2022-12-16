import React from 'react';
import { ProductElement } from '../ProductElement';
import { products } from '../../data';
import { IProduct } from '../../interfaсes';



export function Found() {  
  const productArray = products.products;
  
    return (<div className = "container">
          {productArray.map((product: IProduct, index: number) => <ProductElement product={productArray[index]} key = {productArray[index].id} />)}
  
         {/*  <Product product={products.products[a.next().value as number]}/>
          <Product product={products.products[a.next().value as number]}/>
          <Product product={products.products[a.next().value as number]}/>
          <Product product={products.products[a.next().value as number]}/>
          <Product product={products.products[a.next().value as number]}/> */}      
    </div>)
    
    
    
    
    /* e('div',{className: 'container'}, [
      e('h1', {className: '', key:2}, `a po piske ${count}`),
      e('button', {className: 'py-2 px-4 border',
        key: 1,
        onClick: () => setCount(count + 1)}, 'po hui')
    ]) */
  }