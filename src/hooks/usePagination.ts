import { useMemo } from "react";
import getPageCount from "../components/utils/pages";
import { IProduct } from "../interfaсes";

export const UsePagination = (products: IProduct[], limit: number) => {
  const pagination = useMemo(() => {
  
    const totalCount = products.length;
    const pageCount = getPageCount(totalCount, limit);
    let pagesArray = [];
    for(let i = 0; i < pageCount; i++){
      let page = [];
      for(let j = limit * i; j < limit * (i + 1); j++){
        page.push(products[j]);
      }
      pagesArray.push(page);
    }
    return pagesArray;
  }, [limit, products])
  return pagination;
}

export default UsePagination;


