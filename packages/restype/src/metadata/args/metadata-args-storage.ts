import { ActionMetadataArgs } from './action-metadata-args'
import { ControllerMetadataArgs } from './controller-metadata-args'
import { GuardMetadataArgs } from './guard-metadata-args'
import { InterceptorMetadataArgs } from './interceptor-metadata-args'
import { MiddlewareMetadataArgs } from './middleware-metadata-args'
import { ParamMetadataArgs } from './param-metadata-args'
import { PipeMetadataArgs } from './pipe-metadata-args'
import { SpecificationMetadataArgs } from './specification-metadata-args'

export class MetadataArgsStorage {
  public static readonly instance = new MetadataArgsStorage()

  protected readonly _controllers: ControllerMetadataArgs[] = []
  protected readonly _interceptors: InterceptorMetadataArgs[] = []
  protected readonly _guards: GuardMetadataArgs[] = []
  protected readonly _middlewares: MiddlewareMetadataArgs[] = []
  protected readonly _pipes: PipeMetadataArgs[] = []
  protected readonly _actions: ActionMetadataArgs[] = []
  protected readonly _params: ParamMetadataArgs[] = []
  protected readonly _specifications: SpecificationMetadataArgs[] = []
  protected isLocked = false

  public get controllers(): readonly ControllerMetadataArgs[] {
    return this._controllers
  }

  public get interceptors(): readonly InterceptorMetadataArgs[] {
    return this._interceptors
  }

  public get guards(): readonly GuardMetadataArgs[] {
    return this._guards
  }

  public get middlewares(): readonly MiddlewareMetadataArgs[] {
    return this._middlewares
  }

  public get pipes(): readonly PipeMetadataArgs[] {
    return this._pipes
  }

  public get actions(): readonly ActionMetadataArgs[] {
    return this._actions
  }

  public get params(): readonly ParamMetadataArgs[] {
    return this._params
  }

  public get specifications(): readonly SpecificationMetadataArgs[] {
    return this._specifications
  }

  public lock() {
    this._guards.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    this._interceptors.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    this._middlewares.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    this._pipes.sort((a, b) => (a.priority ?? 0) - (b.priority ?? 0))
    this._params.sort((a, b) => a.index - b.index)

    this.isLocked = true
  }

  public addController(args: ControllerMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add controller after initialization.')
    }

    this._controllers.push(args)
  }

  public addInterceptor(args: InterceptorMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add interceptor after initialization.')
    }

    this._interceptors.push(args)
  }

  public addGuard(args: GuardMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add guard after initialization.')
    }

    this._guards.push(args)
  }

  public addMiddleware(args: MiddlewareMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add middleware after initialization.')
    }

    this._middlewares.push(args)
  }

  public addPipe(args: PipeMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add pipe after initialization.')
    }

    this._pipes.push(args)
  }

  public addAction(args: ActionMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add action after initialization.')
    }

    this._actions.push(args)
  }

  public addParam(args: ParamMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add param after initialization.')
    }

    this._params.push(args)
  }

  public addSpecification(args: SpecificationMetadataArgs) {
    if (this.isLocked) {
      throw new Error('Cannot add specification after initialization.')
    }

    this._specifications.push(args)
  }
}
