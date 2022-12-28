import { products } from "../data"
import Cart from "./cart"
import Footer from "./footer"
import Header from "./header"
import NotFound from "./not-found"
import { Product } from "./product-card"
// import { Product } from "./product-card"

const App: React.FC = () => {
  return (
  <div className="body">
    
    <Header />
      {/* <NotFound /> */}
      <Cart />
      {/* <Product product = { products[1] }/> */}
    <Footer />
  </div>)
}

export {App}