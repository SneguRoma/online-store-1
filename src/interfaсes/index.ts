import React from "react";

export interface IProduct {
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



