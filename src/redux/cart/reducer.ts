import { createSlice } from "@reduxjs/toolkit";
import { IProduct } from "../../interfaсes";


const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemsInCart: <IProduct[]>[],
  },
  reducers: {
    setItemInCart: (state, action) => {
      state.itemsInCart.push(action.payload)
    },
    deleteItemFromCart: (state, action) => {
      state.itemsInCart = state.itemsInCart.filter(item => item.id !== action.payload)
    },
  }
});

export const { setItemInCart, deleteItemFromCart } = cartSlice.actions;
export default cartSlice.reducer; 