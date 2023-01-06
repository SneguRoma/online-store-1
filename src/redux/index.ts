import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cart/reducer';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  }
})