import { getMetadataArgsStorage } from '../globals'
import { IGuard } from '../interfaces/guard.interface'
import { Constructable } from '../types/constructable'

export interface IGuardOptions {
  priority?: number
}

export function Guard(opts?: IGuardOptions): ClassDecorator {
  return (target) => {
    getMetadataArgsStorage().addGuard({
      priority: opts?.priority,
      guard: target as unknown as Constructable<IGuard>
    })
  }
}
