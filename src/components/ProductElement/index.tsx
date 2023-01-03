import React from 'react';
import { IProduct } from '../../interfaсes';


interface ProductProps {
  product: IProduct
}

export function ProductElement({product}: ProductProps){
  return (    
    <div>       
      <img src={product.images[0]} alt={product.title} className="product_image" />
      <div className="product_info">
        <ul className="product_info_list">
          <li className="product_info_item"><strong>Category:  </strong>  {product.category}</li>
          <li className="product_info_item"><strong>Brand: </strong>{product.brand}</li>
          <li className="product_info_item"><strong>Description:  </strong>{product.description}</li>
          <li className="product_info_item"><strong>Rating:  </strong> {product.rating}</li>
          <li className="product_info_item"><strong>Title:  </strong>{product.title}</li>
          <li className="product_info_item"><strong>Price:  </strong>{product.price} $</li>
          <li className="product_info_item"><strong>Discount:  </strong>{product.discountPercentage} $</li>
          <li className="product_info_item"><strong>Stock:  </strong>{product.stock} items</li>
        </ul>
      </div>
    </div>
  )
   
  
}