import { ParamMetadataType, TsMetadataKey } from '../constants/metadata'
import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

export interface IQueryOptions {
  /**
   * The name of the query parameter.
   */
  name?: string
  /**
   * Whether the query parameter is optional.
   */
  optional?: boolean
  /**
   * If set, the query parameter will be validated and transformed to the given type.
   */
  type?: any
}

export function Query(): ParameterDecorator
export function Query(name: string): ParameterDecorator
export function Query(opts: IQueryOptions): ParameterDecorator
export function Query(args?: IQueryOptions | string): ParameterDecorator {
  const opts: IQueryOptions =
    typeof args === 'object' ? args : typeof args === 'string' ? { name: args } : {}

  return (object, method, index) => {
    getMetadataArgsStorage().addParam({
      type: ParamMetadataType.Query,
      controller: object.constructor as Constructable<any>,
      property: method as string,
      index: index,
      name: opts.name,
      optional: opts.optional,
      implicitType: Reflect.getMetadata(TsMetadataKey.ParamTypes, object, method as any)[index],
      explicitType: opts.type
    })
  }
}
