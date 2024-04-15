export type InterceptorCtor = new (...args: any[]) => IInterceptor

export interface IInterceptor {
  intercept(value: any): any
}
