import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaсes";


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemsInCart: <IProduct[]>[],
  },
  reducers: {
    setItemInCart: (state, action) => {
      if (!action.payload.quantity) action.payload.quantity = 1;
      state.itemsInCart.push(action.payload)
    },
    deleteItemFromCart: (state, action) => {
      state.itemsInCart.forEach(elem => { if (elem.id === action.payload.id) console.log(elem) })
      state.itemsInCart = state.itemsInCart.filter(item => { item.id !== action.payload.id })
    },
  }
});

export const { setItemInCart, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer; 