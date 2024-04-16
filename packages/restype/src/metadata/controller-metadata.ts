import { ActionMetadata } from './action-metadata'
import { GuardMetadata } from './guard-metadata'
import { InterceptorMetadata } from './interceptor-metadata'
import { MiddlewareMetadata } from './middleware-metadata'
import { PipeMetadata } from './pipe-metadata'

export class ControllerMetadata {
  public readonly instance: Function
  public readonly route: string
  public readonly actions: ActionMetadata[] = []
  public readonly guards: GuardMetadata[] = []
  public readonly interceptors: InterceptorMetadata[] = []
  public readonly middlewares: MiddlewareMetadata[] = []
  public readonly pipes: PipeMetadata[] = []
  public readonly tags: string[] = []
  public produces?: string
  public consumes?: string

  public constructor(instance: Function, route: string) {
    this.instance = instance
    this.route = route
  }
}
