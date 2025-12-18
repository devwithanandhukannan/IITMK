export function square(n) {
  return n * n;
}

export function cube(n) {
  return n * n * n;
}

export function factorial(n) {
  if (n==1){
    return 0;
  }else {
    return n* factorial(n-1)
  }
}
