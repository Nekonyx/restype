import { ParamMetadataType, TsMetadataKey } from '../constants/metadata'
import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

export interface IBodyOptions {
  /**
   * If set to true, the parameter is optional
   */
  optional?: boolean
  /**
   * If set, the parameter will be validated and transformed to the given type
   */
  type?: any
}

/**
 * Decorator to inject the request body into a controller action parameter
 * @param opts Options
 */
export function Body(opts?: IBodyOptions): ParameterDecorator {
  return (object, method, index) => {
    const metadata = Reflect.getMetadata('restype/controller', object)
    console.log(metadata)
    getMetadataArgsStorage().addParam({
      type: ParamMetadataType.Body,
      controller: object.constructor as Constructable<any>,
      property: method as string,
      index: index,
      optional: opts?.optional,
      implicitType: Reflect.getMetadata(TsMetadataKey.ParamTypes, object, method as any)[index],
      explicitType: opts?.type
    })
  }
}
