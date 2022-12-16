export function* generateNumber(start:number, end: number){
  for (let i: number = start;i < end; i++){
    yield  i;
  }
}
