import { IInterceptor } from '../interfaces/interceptor.interface'

export class InterceptorMetadata {
  public readonly controller?: Function
  public readonly instance: IInterceptor

  public constructor(instance: IInterceptor, controller?: Function) {
    this.instance = instance
    this.controller = controller
  }
}
