import { ControllerMetadata } from '../metadata/controller-metadata'
import { GuardMetadata } from '../metadata/guard-metadata'
import { InterceptorMetadata } from '../metadata/interceptor-metadata'
import { MiddlewareMetadata } from '../metadata/middleware-metadata'
import { PipeMetadata } from '../metadata/pipe-metadata'

export interface IDriverSetupParams {
  controllers: ControllerMetadata[]
  middlewares: MiddlewareMetadata[]
  interceptors: InterceptorMetadata[]
  guards: GuardMetadata[]
  pipes: PipeMetadata[]
}

export interface IDriver {
  setup(params: IDriverSetupParams): void | Promise<void>
  getHandlers(): any[]
}
