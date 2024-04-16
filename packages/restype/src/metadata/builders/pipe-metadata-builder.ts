import { getFromContainer } from '../../ioc/ioc'
import { PipeMetadataArgs } from '../args/pipe-metadata-args'
import { PipeMetadata } from '../pipe-metadata'

export class PipeMetadataBuilder {
  public build(args: PipeMetadataArgs): PipeMetadata {
    const controller = args.controller ? getFromContainer(args.controller) : undefined
    const instance = getFromContainer(args.pipe)

    return new PipeMetadata(instance, controller)
  }
}
