import { ActionType } from '../constants/action'
import { Constructable } from '../types/constructable'
import { ResponseSpecification } from '../types/specification'
import { GuardMetadata } from './guard-metadata'
import { InterceptorMetadata } from './interceptor-metadata'
import { MiddlewareMetadata } from './middleware-metadata'
import { ParamMetadata } from './param-metadata'
import { PipeMetadata } from './pipe-metadata'

export interface IActionMetadataOptions {
  type: ActionType
  route: string | RegExp
  controller: Constructable<any>
  property: string
}

export class ActionMetadata {
  public readonly type: ActionType
  public readonly route: string | RegExp
  public readonly handler: Function
  public readonly params: ParamMetadata[] = []
  public readonly guards: GuardMetadata[] = []
  public readonly interceptors: InterceptorMetadata[] = []
  public readonly middlewares: MiddlewareMetadata[] = []
  public readonly pipes: PipeMetadata[] = []
  public readonly responses: ResponseSpecification[] = []
  public produces?: string
  public consumes?: string

  public constructor(opts: IActionMetadataOptions) {
    this.type = opts.type
    this.route = opts.route
    this.handler = opts.controller.prototype[opts.property]
  }
}
