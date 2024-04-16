import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

export function Controller(route: string): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata('restype/controller', route, target)
    getMetadataArgsStorage().addController({
      controller: target as unknown as Constructable<any>,
      route: route
    })
  }
}
