import { IIocAdapter } from '../interfaces/ioc-adapter.interface'
import { Constructable } from '../types/constructable'

export class DefaultIocAdapter implements IIocAdapter {
  public static readonly instance = new DefaultIocAdapter()

  public readonly container = new Map<Constructable<any>, any>()

  public get<T>(target: Constructable<T>): T {
    let instance = this.container.get(target)

    if (!instance) {
      instance = new target()
      this.container.set(target, instance)
    }

    return instance
  }
}
