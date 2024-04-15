export type Ctor<T> = new (...args: any[]) => T

export interface IIocAdapter {
  get<T>(target: Ctor<T>): T
}
