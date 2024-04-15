import { Restype } from '../restype'

export type DriverCtor<T extends IDriver> = new (opts: IDriverOptions<T>) => T

export interface IDriverOptions<T extends IDriver> {
  restype: Restype<T>
}

export interface IDriver {
  setup(): Promise<void>
  getHandlers(): any[]
}
