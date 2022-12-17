import { products } from "../data"
import { Product } from "./product-card"

const App: React.FC = () => {
  return <div>
    <Product product = { products[1] }/>
  </div>
}

export {App}