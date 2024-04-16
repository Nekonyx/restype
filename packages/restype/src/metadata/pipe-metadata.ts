import { IPipe } from '../interfaces/pipe.interface'

export class PipeMetadata {
  public readonly controller?: Function
  public readonly instance: IPipe

  public constructor(instance: IPipe, controller?: Function) {
    this.instance = instance
    this.controller = controller
  }
}
