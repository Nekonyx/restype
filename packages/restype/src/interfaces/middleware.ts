export type MiddlewareCtor = new (...args: any[]) => IMiddleware

export interface IMiddleware {
  use(req: any, res: any, next: any): void
}
