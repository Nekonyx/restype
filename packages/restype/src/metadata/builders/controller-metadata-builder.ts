import { SpecificationKind } from '../../constants/specification'
import { getMetadataArgsStorage } from '../../globals'
import { getFromContainer } from '../../ioc/ioc'
import { ControllerMetadataArgs } from '../args/controller-metadata-args'
import { ControllerMetadata } from '../controller-metadata'
import { ActionMetadataBuilder } from './action-metadata-builder'
import { GuardMetadataBuilder } from './guard-metadata-builder'
import { InterceptorMetadataBuilder } from './interceptor-metadata-builder'
import { MiddlewareMetadataBuilder } from './middleware-metadata-builder'
import { PipeMetadataBuilder } from './pipe-metadata-builder'

export class ControllerMetadataBuilder {
  protected readonly storage = getMetadataArgsStorage()
  protected readonly actionMetadataBuilder = new ActionMetadataBuilder()
  protected readonly middlewareMetadataBuilder = new MiddlewareMetadataBuilder()
  protected readonly guardMetadataBuilder = new GuardMetadataBuilder()
  protected readonly pipeMetadataBuilder = new PipeMetadataBuilder()
  protected readonly interceptorMetadataBuilder = new InterceptorMetadataBuilder()

  public build(args: ControllerMetadataArgs): ControllerMetadata {
    const instance = getFromContainer(args.controller)
    const metadata = new ControllerMetadata(instance, args.route)

    for (const action of this.storage.actions) {
      if (action.controller !== args.controller) {
        continue
      }

      metadata.actions.push(this.actionMetadataBuilder.build(action))
    }

    for (const middleware of this.storage.middlewares) {
      if (middleware.property || middleware.controller !== args.controller) {
        continue
      }

      metadata.middlewares.push(this.middlewareMetadataBuilder.build(middleware))
    }

    for (const guard of this.storage.guards) {
      if (guard.property || guard.controller !== args.controller) {
        continue
      }

      metadata.guards.push(this.guardMetadataBuilder.build(guard))
    }

    for (const pipe of this.storage.pipes) {
      if (pipe.property || pipe.controller !== args.controller) {
        continue
      }

      metadata.pipes.push(this.pipeMetadataBuilder.build(pipe))
    }

    for (const interceptor of this.storage.interceptors) {
      if (interceptor.property || interceptor.controller !== args.controller) {
        continue
      }

      metadata.interceptors.push(this.interceptorMetadataBuilder.build(interceptor))
    }

    for (const specification of this.storage.specifications) {
      if (specification.property || specification.controller !== args.controller) {
        continue
      }

      switch (specification.specification.kind) {
        case SpecificationKind.Produce:
          metadata.produces = specification.specification.type
          break
        case SpecificationKind.Consume:
          metadata.consumes = specification.specification.type
          break
        case SpecificationKind.Tag:
          metadata.tags.push(specification.specification.tag)
          break
      }
    }

    return metadata
  }
}
