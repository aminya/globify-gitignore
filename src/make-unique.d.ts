declare module "make-unique" {
  function unique<T>(array: T[]): T[]
  function unique<T>(array: T[], matcher: (a: T, b: T) => boolean): T[]
  export = unique
}
