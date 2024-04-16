import { getMetadataArgsStorage } from '../globals'
import { IMiddleware } from '../interfaces/middleware.interface'
import { Constructable } from '../types/constructable'

export interface IMiddlewareOptions {
  priority?: number
}

export function Middleware(opts?: IMiddlewareOptions): ClassDecorator {
  return (target) => {
    getMetadataArgsStorage().addMiddleware({
      priority: opts?.priority,
      middleware: target as unknown as Constructable<IMiddleware>
    })
  }
}
