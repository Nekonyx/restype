import { getFromContainer } from '../../ioc/ioc'
import { MiddlewareMetadataArgs } from '../args/middleware-metadata-args'
import { MiddlewareMetadata } from '../middleware-metadata'

export class MiddlewareMetadataBuilder {
  public build(args: MiddlewareMetadataArgs): MiddlewareMetadata {
    const controller = args.controller ? args.controller : undefined
    const instance = getFromContainer(args.middleware)

    return new MiddlewareMetadata(instance, controller)
  }
}
