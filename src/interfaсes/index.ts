import React from "react";
import { ChangeEvent } from "react";

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
  onChange: (e: string | number) => void;
}




