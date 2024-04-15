import { IGuard } from '../interfaces/guard'
import { IInterceptor } from '../interfaces/interceptor'
import { IMiddleware } from '../interfaces/middleware'
import { IPipe } from '../interfaces/pipe'
import { ParamMetadata } from './param-metadata'

export class MethodMetadata {
  public readonly params: ParamMetadata[] = []
  public readonly guards: IGuard[] = []
  public readonly interceptors: IInterceptor[] = []
  public readonly middlewares: IMiddleware[] = []
  public readonly pipes: IPipe[] = []
  public readonly responses: any[] = []
  public produces?: string
  public consumes?: string

  public addParam(param: ParamMetadata) {
    this.params.push(param)
  }

  public addGuard() {
    //
  }

  public addInterceptor() {
    //
  }

  public addMiddleware() {
    //
  }

  public addResponse() {
    //
  }

  public addPipe() {
    //
  }

  public setProduces() {
    //
  }

  public setConsumes() {
    //
  }
}
