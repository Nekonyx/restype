import { getFromContainer } from '../../ioc/ioc'
import { InterceptorMetadataArgs } from '../args/interceptor-metadata-args'
import { InterceptorMetadata } from '../interceptor-metadata'

export class InterceptorMetadataBuilder {
  public build(args: InterceptorMetadataArgs): InterceptorMetadata {
    const controller = args.controller ? args.controller : undefined
    const instance = getFromContainer(args.interceptor)

    return new InterceptorMetadata(instance, controller)
  }
}
