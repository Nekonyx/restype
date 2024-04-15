import type { Ctor, IIocAdapter } from './ioc-adapter'

export class DefaultIocAdapter implements IIocAdapter {
  private readonly container = new Map<Ctor<any>, any>()

  public get<T>(target: Ctor<T>): T {
    let instance = this.container.get(target)

    if (!instance) {
      instance = new target()
      this.container.set(target, instance)
    }

    return instance
  }
}
