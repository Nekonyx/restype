import { IIocAdapter } from '../interfaces/ioc-adapter.interface'
import { Constructable } from '../types/constructable'
import { DefaultIocAdapter } from './default-ioc-adapter'

let customIocAdapter: IIocAdapter | null = null

export function useContainer(adapter: IIocAdapter) {
  customIocAdapter = adapter
}

export function getContainer(): IIocAdapter {
  return customIocAdapter ?? DefaultIocAdapter.instance
}

export function getFromContainer<T>(target: Constructable<T>): T {
  // prettier-ignore
  return customIocAdapter
    ? customIocAdapter.get(target)
    : DefaultIocAdapter.instance.get(target)
}
