import { IInterceptor } from '../../interfaces/interceptor.interface'
import { Constructable } from '../../types/constructable'

export interface InterceptorMetadataArgs {
  interceptor: Constructable<IInterceptor>
  priority?: number
  controller?: Constructable<any>
  property?: string
}
