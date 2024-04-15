import { DefaultIocAdapter } from './default-ioc-adapter'
import type { Ctor, IIocAdapter } from './ioc-adapter'

const defaultIocAdapter: IIocAdapter = new DefaultIocAdapter()

let userIocAdapter: IIocAdapter | null = null

export function useContainer(adapter: IIocAdapter) {
  userIocAdapter = adapter
}

export function getContainer(): IIocAdapter {
  return userIocAdapter ?? defaultIocAdapter
}

export function getFromContainer<T>(target: Ctor<T>): T {
  // prettier-ignore
  return userIocAdapter
    ? userIocAdapter.get(target)
    : defaultIocAdapter.get(target)
}
