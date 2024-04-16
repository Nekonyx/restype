import { Constructable } from '../../types/constructable'
import { Specification } from '../../types/specification'

export interface SpecificationMetadataArgs {
  controller: Constructable<any>
  property?: string
  specification: Specification
}
