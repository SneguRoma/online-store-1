import { products } from "../data"
import Cart from "./cart"
import { Product } from "./product-card"
// import { Product } from "./product-card"

const App: React.FC = () => {
  return <div>
    {/* <Product product = { products[1] }/> */}
    <Cart />
  </div>
}

export {App}