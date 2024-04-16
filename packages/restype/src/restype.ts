import { globSync } from 'glob'
import { normalize } from 'path'
import { getMetadataArgsStorage, isConstructable } from './globals'
import { IDriver } from './interfaces/driver.interface'
import { IGuard } from './interfaces/guard.interface'
import { IInterceptor } from './interfaces/interceptor.interface'
import { IMiddleware } from './interfaces/middleware.interface'
import { IPipe } from './interfaces/pipe.interface'
import { getFromContainer } from './ioc/ioc'
import { ControllerMetadataBuilder } from './metadata/builders/controller-metadata-builder'
import { GuardMetadataBuilder } from './metadata/builders/guard-metadata-builder'
import { InterceptorMetadataBuilder } from './metadata/builders/interceptor-metadata-builder'
import { MiddlewareMetadataBuilder } from './metadata/builders/middleware-metadata-builder'
import { PipeMetadataBuilder } from './metadata/builders/pipe-metadata-builder'
import { ControllerMetadata } from './metadata/controller-metadata'
import { GuardMetadata } from './metadata/guard-metadata'
import { InterceptorMetadata } from './metadata/interceptor-metadata'
import { MiddlewareMetadata } from './metadata/middleware-metadata'
import { PipeMetadata } from './metadata/pipe-metadata'
import { Constructable } from './types/constructable'

export interface IRestypeOptions<T extends IDriver> {
  driver?: T
  driverFactory?(restype: Restype<T>): T
  controllers?: (Constructable<any> | string)[]
  middlewares?: (Constructable<IMiddleware> | string)[]
  guards?: (Constructable<IGuard> | string)[]
  interceptors?: (Constructable<IInterceptor> | string)[]
  pipes?: (Constructable<IPipe> | string)[]
}

export class Restype<T extends IDriver> {
  public static readonly instances: Restype<any>[] = []
  public readonly driver: T
  public readonly controllers: ControllerMetadata[] = []
  public readonly guards: GuardMetadata[] = []
  public readonly interceptors: InterceptorMetadata[] = []
  public readonly middlewares: MiddlewareMetadata[] = []
  public readonly pipes: PipeMetadata[] = []
  public isInitialized = false

  public constructor(public readonly opts: IRestypeOptions<T>) {
    Restype.instances.push(this)

    this.driver = this.getDriverFromOptions(opts)
  }

  public async setup() {
    if (this.isInitialized) {
      throw new Error('Cannot setup after initialization.')
    }

    this.isInitialized = true

    await Promise.all([
      this.opts.controllers && this.importModules(this.opts.controllers),
      this.opts.middlewares && this.importModules(this.opts.middlewares),
      this.opts.interceptors && this.importModules(this.opts.interceptors),
      this.opts.pipes && this.importModules(this.opts.pipes),
      this.opts.guards && this.importModules(this.opts.guards)
    ])

    await this.buildMetadata()

    await this.driver.setup({
      controllers: this.controllers,
      guards: this.guards,
      interceptors: this.interceptors,
      middlewares: this.middlewares,
      pipes: this.pipes
    })
  }

  public getHandlers() {
    return this.driver.getHandlers() as ReturnType<T['getHandlers']>
  }

  private getDriverFromOptions(opts: IRestypeOptions<T>) {
    if (opts.driver) {
      return opts.driver
    } else if (opts.driverFactory) {
      return opts.driverFactory(this)
    } else {
      throw new Error('Driver or driverFactory must be provided.')
    }
  }

  private async buildMetadata() {
    const controllerMetadataBuilder = new ControllerMetadataBuilder()
    const middlewareMetadataBuilder = new MiddlewareMetadataBuilder()
    const guardMetadataBuilder = new GuardMetadataBuilder()
    const pipeMetadataBuilder = new PipeMetadataBuilder()
    const interceptorMetadataBuilder = new InterceptorMetadataBuilder()

    const storage = getMetadataArgsStorage()
    storage.lock()

    for (const args of storage.controllers) {
      this.controllers.push(controllerMetadataBuilder.build(args))
    }

    for (const args of storage.middlewares) {
      this.middlewares.push(middlewareMetadataBuilder.build(args))
    }

    for (const args of storage.guards) {
      this.guards.push(guardMetadataBuilder.build(args))
    }

    for (const args of storage.pipes) {
      this.pipes.push(pipeMetadataBuilder.build(args))
    }

    for (const args of storage.interceptors) {
      this.interceptors.push(interceptorMetadataBuilder.build(args))
    }
  }

  private async importModules<T>(modules: (Constructable<T> | string)[]): Promise<void> {
    for (const module of modules) {
      if (isConstructable(module)) {
        getFromContainer(module)
      } else {
        const pattern = normalize(module).replace(/\\/g, '/')

        const paths = globSync(pattern, {
          absolute: true
        })

        for (const path of paths) {
          const url = new URL(`file://${path}`)
          await import(url.toString())
        }
      }
    }
  }
}
