import { IMiddleware } from '../interfaces/middleware.interface'

export class MiddlewareMetadata {
  public readonly controller?: Function
  public readonly instance: IMiddleware

  public constructor(instance: IMiddleware, controller?: Function) {
    this.instance = instance
    this.controller = controller
  }
}
