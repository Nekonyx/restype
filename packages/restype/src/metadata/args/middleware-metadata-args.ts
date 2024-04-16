import { IMiddleware } from '../../interfaces/middleware.interface'
import { Constructable } from '../../types/constructable'

export interface MiddlewareMetadataArgs {
  middleware: Constructable<IMiddleware>
  priority?: number
  controller?: Constructable<any>
  property?: string
}
