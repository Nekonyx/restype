import { Constructable } from '../types/constructable'

export interface IIocAdapter {
  get<T>(target: Constructable<T>): T
}
