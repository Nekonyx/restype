export type PipeCtor = new (...args: any[]) => IPipe

export interface IPipe {
  transform(value: any): any
}
