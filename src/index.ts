function fib(n: number): number {
  if (n <= 1) return n
  return fib(n - 1) + fib(n - 2)
}
console.info(`fib(2) = ${fib(2)}`)
console.info(`fib(10) = ${fib(10)}`)
