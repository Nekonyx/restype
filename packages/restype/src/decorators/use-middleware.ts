import { getMetadataArgsStorage } from '../globals'
import { IMiddleware } from '../interfaces/middleware.interface'
import { Constructable } from '../types/constructable'

export function UseMiddleware(
  middleware: Constructable<IMiddleware>
): ClassDecorator & MethodDecorator {
  return (target: Function | Object, property?: unknown) => {
    getMetadataArgsStorage().addMiddleware({
      controller: (property ? target.constructor : target) as Constructable<any>,
      middleware: middleware,
      property: property as string
    })
  }
}
