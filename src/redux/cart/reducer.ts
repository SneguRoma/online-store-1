import { createSlice } from "@reduxjs/toolkit";
import { isTemplateMiddle } from "typescript";
import { IProduct } from "../../interfaсes";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    itemsInCart: <IProduct[]>[],
  },
  reducers: {
    setItemInCart: (state, action) => {
      state.itemsInCart.push({ ...action.payload, quantity: 1 });
    },
    deleteItemFromCart: (state, action) => {
      const removeItem = state.itemsInCart.filter((item) => item.id !== action.payload.id);
      state.itemsInCart = removeItem;
    },
    increment: (state, action) => {
      const item = state.itemsInCart.find((item) => item.id === action.payload.id);
      if (item && item.quantity) {
        item.quantity = item.quantity + 1
      };
    },
    decrement: (state, action) => {
      const item = state.itemsInCart.find((item) => item.id === action.payload.id);
      if (item && item.quantity) {
        item.quantity = item.quantity - 1;
      }
    },
    reset: (state) => {
      state.itemsInCart = [];
    },
  }
});

export const { setItemInCart, deleteItemFromCart, increment, decrement, reset } = cartSlice.actions;
export default cartSlice.reducer; 