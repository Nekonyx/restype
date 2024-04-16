import { getMetadataArgsStorage } from '../globals'
import { IGuard } from '../interfaces/guard.interface'
import { Constructable } from '../types/constructable'

export function UseGuard(guard: Constructable<IGuard>): ClassDecorator & MethodDecorator {
  return (target: Function | Object, property?: unknown) => {
    getMetadataArgsStorage().addGuard({
      controller: (property ? target.constructor : target) as Constructable<any>,
      guard: guard,
      property: property as string
    })
  }
}
