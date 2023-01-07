interface IProductKeys {
  [key: string | number]: string | number | string[] | undefined;
}

export interface IProduct extends IProductKeys {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  quantity?: number
}

export interface ProductOpts {
  value: string | number,
  name: string,
  id?: number
}

export interface ProductOptsArr {
  options: ProductOpts[],
  defaultValue: string,
  value: string | number,
  onChange: (e: string | number) => void,
}

export interface ISwitcher {
  quantityPages: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  page: number
}

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../redux/index'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector