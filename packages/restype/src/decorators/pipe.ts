import { getMetadataArgsStorage } from '../globals'
import { IPipe } from '../interfaces/pipe.interface'
import { Constructable } from '../types/constructable'

export interface IPipeOptions {
  priority?: number
}

export function Pipe(opts?: IPipeOptions): ClassDecorator {
  return (target) => {
    getMetadataArgsStorage().addPipe({
      pipe: target as unknown as Constructable<IPipe>,
      priority: opts?.priority
    })
  }
}
