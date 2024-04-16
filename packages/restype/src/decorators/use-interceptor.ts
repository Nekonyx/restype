import { getMetadataArgsStorage } from '../globals'
import { IInterceptor } from '../interfaces/interceptor.interface'
import { Constructable } from '../types/constructable'

export function UseInterceptor(
  interceptor: Constructable<IInterceptor>
): ClassDecorator & MethodDecorator {
  return (target: Function | Object, property?: unknown) => {
    getMetadataArgsStorage().addInterceptor({
      controller: (property ? target.constructor : target) as Constructable<any>,
      interceptor: interceptor,
      property: property as string
    })
  }
}
