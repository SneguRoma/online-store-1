import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { products } from "./data"
import Cart from "./pages/cart"
import { Found } from "./pages/Found"
import NotFound from "./pages/not-found"
import { Product } from "./pages/product-card"

const App: React.FC = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='*' element={<NotFound />} />
      <Route path="/" element={<Found/>}></Route>
      <Route path="/items/:id" element={<Product/>}></Route>
      <Route path="/cart" element={<Cart/>}></Route>  
    </Routes>
      
    </BrowserRouter>
  )
}

export {App}