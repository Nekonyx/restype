import { IPipe } from '../../interfaces/pipe.interface'
import { Constructable } from '../../types/constructable'

export interface PipeMetadataArgs {
  pipe: Constructable<IPipe>
  priority?: number
  controller?: Constructable<any>
  property?: string
}
