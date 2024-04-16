import Router from '@koa/router'
import type Koa from 'koa'
import type { Context, Middleware, Next } from 'koa'

import { ActionType } from '../../constants/action'
import { IAction } from '../../interfaces/action.interface'
import { IDriverSetupParams } from '../../interfaces/driver.interface'
import { ActionMetadata } from '../../metadata/action-metadata'
import { ControllerMetadata } from '../../metadata/controller-metadata'
import { GuardMetadata } from '../../metadata/guard-metadata'
import { InterceptorMetadata } from '../../metadata/interceptor-metadata'
import { MiddlewareMetadata } from '../../metadata/middleware-metadata'
import { PipeMetadata } from '../../metadata/pipe-metadata'
import { DriverBase } from '../driver-base'
import { IKoaContext } from './koa-context'

export interface IKoaDriverOptions {
  app: Koa
  router: Router
}

export class KoaDriver extends DriverBase {
  protected readonly app: Koa
  protected readonly router: Router
  protected readonly handlers: Middleware[] = []

  public constructor(opts: IKoaDriverOptions) {
    super()

    this.app = opts.app
    this.router = opts.router
  }

  public setup(params: IDriverSetupParams) {
    this.handlers.push(
      ...params.middlewares.map((middleware) => this.createMiddleware(middleware)),
      ...params.guards.map((guard) => this.createGuard(guard)),
      ...params.pipes.map((pipe) => this.createPipe(pipe)),
      this.router.routes() as Middleware,
      this.router.allowedMethods() as Middleware,
      ...params.interceptors.map((interceptor) => this.createInterceptor(interceptor))
    )

    for (const controller of params.controllers) {
      const subRouter = new Router({
        ...this.router.opts,
        prefix: controller.route
      })

      if (controller.actions.length > 0) {
        this.router.use(controller.route, subRouter.routes(), subRouter.allowedMethods())
      }

      for (const action of controller.actions) {
        const handlers: Middleware[] = [
          ...controller.middlewares.map((middleware) => this.createMiddleware(middleware)),
          ...controller.guards.map((guard) => this.createGuard(guard)),
          ...action.middlewares.map((middleware) => this.createMiddleware(middleware)),
          ...action.guards.map((guard) => this.createGuard(guard)),
          ...action.pipes.map((pipe) => this.createPipe(pipe)),
          this.createActionHandler(controller, action),
          ...action.interceptors.map((interceptor) => this.createInterceptor(interceptor)),
          ...controller.interceptors.map((interceptor) => this.createInterceptor(interceptor))
        ]

        console.log(`Route ${controller.route} ${action.route} handlers:`, handlers)

        switch (action.type) {
          case ActionType.Get:
            subRouter.get(action.route, ...handlers)
            break
          case ActionType.Post:
            subRouter.post(action.route, ...handlers)
            break
          case ActionType.Put:
            subRouter.put(action.route, ...handlers)
            break
          case ActionType.Patch:
            subRouter.patch(action.route, ...handlers)
            break
          case ActionType.Delete:
            subRouter.delete(action.route, ...handlers)
            break
          case ActionType.Options:
            subRouter.options(action.route, ...handlers)
            break
          case ActionType.Head:
            subRouter.head(action.route, ...handlers)
            break
          case ActionType.All:
            subRouter.all(action.route, ...handlers)
            break
        }
      }
    }
  }

  public getHandlers(): Middleware[] {
    return this.handlers
  }

  protected createAction(ctx: Context, next: Next): IAction {
    return {
      context: this.createContext(ctx, next)
    }
  }

  protected createContext(ctx: Context, next: Next): IKoaContext {
    return {
      req: ctx.request,
      ctx,
      next
    }
  }

  protected createActionHandler(
    controller: ControllerMetadata,
    action: ActionMetadata
  ): Middleware {
    const handler: Middleware = async (ctx, next) => {
      try {
        if (action.produces || controller.produces) {
          ctx.type = action.produces! ?? controller.produces!
        }

        ctx.body = action.handler.call(controller.instance)
      } finally {
        return next()
      }
    }

    Object.defineProperty(handler, 'name', {
      value: `handler ${action.handler.name}`,
      writable: false
    })

    return handler
  }

  protected createMiddleware(metadata: MiddlewareMetadata): Middleware {
    const handler: Middleware = async (ctx, next) => {
      const action = this.createAction(ctx, next)

      await metadata.instance.use(action)
    }

    Object.defineProperty(handler, 'name', {
      value: `handler ${metadata.instance.constructor.name}`,
      writable: false
    })

    return handler
  }

  protected createInterceptor(metadata: InterceptorMetadata): Middleware {
    const handler: Middleware = async (ctx, next) => {
      const action = this.createAction(ctx, next)

      ctx.body = await metadata.instance.intercept(action, ctx.body)

      return next()
    }

    Object.defineProperty(handler, 'name', {
      value: `handler ${metadata.instance.constructor.name}`,
      writable: false
    })

    return handler
  }

  protected createGuard(metadata: GuardMetadata): Middleware {
    const handler: Middleware = async (ctx, next) => {
      const action = this.createAction(ctx, next)
      const canActivate = await metadata.instance.canActivate(action)

      if (!canActivate) {
        throw new Error("Can't activate")
      }

      return next()
    }

    Object.defineProperty(handler, 'name', {
      value: `handler ${metadata.instance.constructor.name}`,
      writable: false
    })

    return handler
  }

  protected createPipe(metadata: PipeMetadata): Middleware {
    const handler: Middleware = async (ctx, next) => {
      const action = this.createAction(ctx, next)

      ;(ctx.request as any).body = await metadata.instance.transform(
        action,
        (ctx.request as any).body
      )

      return next()
    }

    Object.defineProperty(handler, 'name', {
      value: `handler ${metadata.instance.constructor.name}`,
      writable: false
    })

    return handler
  }
}
