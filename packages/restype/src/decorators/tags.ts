import { SpecificationKind } from '../constants/specification'
import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

export function Tags(...tags: string[]): ClassDecorator {
  return (target) => {
    for (const tag of tags) {
      getMetadataArgsStorage().addSpecification({
        controller: target as unknown as Constructable<any>,
        specification: {
          kind: SpecificationKind.Tag,
          tag
        }
      })
    }
  }
}
