const getPageCount = (totalCount: number, limit: number): number => {
  return (Math.ceil(totalCount / limit));
}

export default getPageCount;