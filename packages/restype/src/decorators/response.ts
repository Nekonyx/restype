import { SpecificationKind } from '../constants/specification'
import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

export interface IResponseOptions {
  /**
   * The status code of the response.
   */
  status: number
  /**
   * Response object type.
   */
  type: any
}

export function Response(opts: IResponseOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addSpecification({
      controller: target.constructor as Constructable<any>,
      property: property as string,
      specification: {
        kind: SpecificationKind.Response,
        status: opts.status,
        type: opts.type
      }
    })
  }
}
