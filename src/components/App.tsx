import { products } from "../data"
import Cart from "./cart"
import Header from "./header"
// import { Product } from "./product-card"

const App: React.FC = () => {
  return <div>
    {/* <Product product = { products[1] }/> */}
    <Header />
    <Cart />
  </div>
}

export {App}