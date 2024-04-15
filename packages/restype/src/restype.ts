import { IDriver, IDriverOptions } from './drivers/driver'
import { IGuard } from './interfaces/guard'
import { IInterceptor } from './interfaces/interceptor'
import { IMiddleware } from './interfaces/middleware'
import { IPipe } from './interfaces/pipe'
import { ControllerMetadata } from './metadata/controller-metadata'

export interface IRestypeOptions<T extends IDriver> {
  driver?: T
  driverFactory?(opts: IDriverOptions<T>): T
  controllers?: (Function | string)[]
  middlewares?: (Function | string)[]
  guards?: (Function | string)[]
  interceptors?: (Function | string)[]
  pipes?: (Function | string)[]
}

export class Restype<T extends IDriver> {
  public static readonly instances: Restype<any>[] = []
  public readonly driver: T
  public readonly controllers: ControllerMetadata[] = []
  public readonly guards: IGuard[] = []
  public readonly interceptors: IInterceptor[] = []
  public readonly middlewares: IMiddleware[] = []
  public readonly pipes: IPipe[] = []

  public constructor(public readonly opts: IRestypeOptions<T>) {
    Restype.instances.push(this)

    if (opts.driver) {
      this.driver = opts.driver
    } else if (opts.driverFactory) {
      this.driver = opts.driverFactory({
        restype: this
      })
    } else {
      throw new Error('Driver or driverFactory must be provided.')
    }
  }

  public addController(controller: ControllerMetadata) {
    this.controllers.push(controller)
  }

  public addGuard(guard: IGuard) {
    this.guards.push(guard)
  }

  public addInterceptor(interceptor: IInterceptor) {
    this.interceptors.push(interceptor)
  }

  public addMiddleware(middleware: IMiddleware) {
    this.middlewares.push(middleware)
  }

  public addPipe(pipe: IPipe) {
    this.pipes.push(pipe)
  }

  public async setup() {
    await this.driver.setup()
  }

  public getHandlers() {
    return this.driver.getHandlers() as ReturnType<T['getHandlers']>
  }
}
