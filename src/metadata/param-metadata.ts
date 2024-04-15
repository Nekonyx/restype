export interface IParamMetadataOptions {
  index: number
  type?: Object
}

export class ParamMetadata {
  public readonly index: number
  public readonly type?: Object

  public constructor(options: IParamMetadataOptions) {
    this.index = options.index
    this.type = options.type
  }
}
