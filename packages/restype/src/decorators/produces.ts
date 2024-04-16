import { SpecificationKind } from '../constants/specification'
import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

/**
 * Sets the MIME type of the response body.
 * @param type MIME type
 */
export function Produces(type: string): ClassDecorator & MethodDecorator {
  return (target: Function | Object, property?: unknown) => {
    getMetadataArgsStorage().addSpecification({
      controller: (property ? target.constructor : target) as Constructable<any>,
      property: property as string,
      specification: {
        kind: SpecificationKind.Produce,
        type
      }
    })
  }
}
