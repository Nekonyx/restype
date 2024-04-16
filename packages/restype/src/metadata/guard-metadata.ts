import { IGuard } from '../interfaces/guard.interface'

export class GuardMetadata {
  public readonly controller?: Function
  public readonly instance: IGuard

  public constructor(instance: IGuard, controller?: Function) {
    this.instance = instance
    this.controller = controller
  }
}
