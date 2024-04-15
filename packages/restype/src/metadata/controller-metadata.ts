import { IGuard } from '../interfaces/guard'
import { IInterceptor } from '../interfaces/interceptor'
import { IMiddleware } from '../interfaces/middleware'
import { IPipe } from '../interfaces/pipe'
import { MethodMetadata } from './method-metadata'

export class ControllerMetadata {
  public readonly methods: MethodMetadata[] = []
  public readonly guards: IGuard[] = []
  public readonly interceptors: IInterceptor[] = []
  public readonly middlewares: IMiddleware[] = []
  public readonly pipes: IPipe[] = []
  public readonly tags: string[] = []
  public produces?: string
  public consumes?: string

  public addMethod(method: MethodMetadata) {
    this.methods.push(method)
  }

  public addGuard() {
    //
  }

  public addInterceptor() {
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

  public setTags() {
    //
  }
}
