import { ParamMetadataType } from '../../constants/metadata'
import { Constructable } from '../../types/constructable'

export interface ParamMetadataArgs {
  /**
   * The type of the parameter
   */
  type: ParamMetadataType
  /**
   * The object the parameter is injected into
   */
  controller: Constructable<any>
  /**
   * The method the parameter is injected into
   */
  property: string
  /**
   * The index of the parameter in the method signature
   */
  index: number
  /**
   * The implicit type of the parameter for validation and transformation
   */
  implicitType: any
  /**
   * The name of the parameter
   */
  name?: string
  /**
   * If the parameter is optional
   */
  optional?: boolean
  /**
   * The explicit type of the parameter for validation and transformation
   */
  explicitType?: any
}
