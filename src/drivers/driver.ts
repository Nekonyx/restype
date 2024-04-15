import { Restype } from '../restype'

export type DriverCtor<T extends IDriver> = new (restype: Restype<T>) => T

export interface IDriver {
  getHandler(): any
}
