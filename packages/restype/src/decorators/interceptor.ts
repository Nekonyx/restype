import { getMetadataArgsStorage } from '../globals'
import { IInterceptor } from '../interfaces/interceptor.interface'
import { Constructable } from '../types/constructable'

export interface IInterceptorOptions {
  priority?: number
}

export function Interceptor(opts?: IInterceptorOptions): ClassDecorator {
  return (target) => {
    getMetadataArgsStorage().addInterceptor({
      priority: opts?.priority,
      interceptor: target as unknown as Constructable<IInterceptor>
    })
  }
}
