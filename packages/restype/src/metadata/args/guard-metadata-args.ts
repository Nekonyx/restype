import { IGuard } from '../../interfaces/guard.interface'
import { Constructable } from '../../types/constructable'

export interface GuardMetadataArgs {
  guard: Constructable<IGuard>
  priority?: number
  controller?: Constructable<any>
  property?: string
}
