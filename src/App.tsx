import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cart from "./pages/cart"
import { Found } from "./pages/Found"
import NotFound from "./pages/not-found"
import { Product } from "./pages/product-card"

const App: React.FC = () => {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Found/>}></Route>
      <Route path="/items/:id" element={<Product/>} errorElement={<NotFound />}></Route>
      <Route path="/cart" element={<Cart/>}></Route>  
      <Route path='*' element={<NotFound />} />
      <Route path='/404' element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export {App}