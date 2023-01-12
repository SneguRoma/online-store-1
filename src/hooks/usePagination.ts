import { useMemo } from "react";
import getPageCount from "../utils/pages";
import { IProduct } from "../interfaсes";

export const UsePagination = (products: IProduct[], limit: number) => {
  const pagination = useMemo(() => {

    let totalCount = products.length;
    const pageCount = getPageCount(totalCount, limit);
    let pagesArray = [];
    let productsArray = [...products];
    for (let i = 0; i < pageCount; i++) {
      let page = [];
      let res = limit;
      if (totalCount <= limit) res = totalCount;

      for (let j = res * i; j < res * (i + 1); j++) {
        page.push(productsArray[productsArray.length - 1]);
        productsArray.pop()
      }
      pagesArray.push(page);
      totalCount = totalCount - limit;
    }
    return pagesArray;
  }, [limit, products])
  return pagination;
}

export default UsePagination;


