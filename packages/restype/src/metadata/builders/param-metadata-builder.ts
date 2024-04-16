import { ParamMetadataArgs } from '../args/param-metadata-args'
import { ParamMetadata } from '../param-metadata'

export class ParamMetadataBuilder {
  public build(args: ParamMetadataArgs): ParamMetadata {
    return new ParamMetadata({
      type: args.type,
      index: args.index
    })
  }
}
