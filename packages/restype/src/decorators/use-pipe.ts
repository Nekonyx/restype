import { getMetadataArgsStorage } from '../globals'
import { IPipe } from '../interfaces/pipe.interface'
import { Constructable } from '../types/constructable'

export function UsePipe(pipe: Constructable<IPipe>): ClassDecorator & MethodDecorator {
  return (target: Function | Object, property?: unknown) => {
    getMetadataArgsStorage().addPipe({
      controller: (property ? target.constructor : target) as Constructable<any>,
      pipe: pipe,
      property: property as string
    })
  }
}
