import { getFromContainer } from '../../ioc/ioc'
import { GuardMetadataArgs } from '../args/guard-metadata-args'
import { GuardMetadata } from '../guard-metadata'

export class GuardMetadataBuilder {
  public build(args: GuardMetadataArgs): GuardMetadata {
    const controller = args.controller ? args.controller : undefined
    const instance = getFromContainer(args.guard)

    return new GuardMetadata(instance, controller)
  }
}
