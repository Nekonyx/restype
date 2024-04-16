import { ActionType } from '../constants/action'
import { getMetadataArgsStorage } from '../globals'
import { Constructable } from '../types/constructable'

export interface IMethodOptions {
  //
}

export function All(route: string, opts?: IMethodOptions): MethodDecorator
export function All(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function All(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.All,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}
export function Get(route: string, opts?: IMethodOptions): MethodDecorator
export function Get(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Get(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Get,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}
export function Post(route: string, opts?: IMethodOptions): MethodDecorator
export function Post(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Post(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Post,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}
export function Put(route: string, opts?: IMethodOptions): MethodDecorator
export function Put(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Put(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Put,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}
export function Patch(route: string, opts?: IMethodOptions): MethodDecorator
export function Patch(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Patch(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Patch,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}

export function Delete(route: string, opts?: IMethodOptions): MethodDecorator
export function Delete(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Delete(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Delete,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}

export function Options(route: string, opts?: IMethodOptions): MethodDecorator
export function Options(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Options(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Options,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}

export function Head(route: string, opts?: IMethodOptions): MethodDecorator
export function Head(route: RegExp, opts?: IMethodOptions): MethodDecorator
export function Head(route: string | RegExp, opts?: IMethodOptions): MethodDecorator {
  return (target, property) => {
    getMetadataArgsStorage().addAction({
      type: ActionType.Head,
      route: route,
      controller: target.constructor as Constructable<any>,
      property: property as string
    })
  }
}
