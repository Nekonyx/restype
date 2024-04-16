import { SpecificationKind } from '../../constants/specification'
import { getMetadataArgsStorage } from '../../globals'
import { ActionMetadata } from '../action-metadata'
import { ActionMetadataArgs } from '../args/action-metadata-args'
import { GuardMetadataBuilder } from './guard-metadata-builder'
import { InterceptorMetadataBuilder } from './interceptor-metadata-builder'
import { MiddlewareMetadataBuilder } from './middleware-metadata-builder'
import { ParamMetadataBuilder } from './param-metadata-builder'
import { PipeMetadataBuilder } from './pipe-metadata-builder'

export class ActionMetadataBuilder {
  protected readonly storage = getMetadataArgsStorage()
  protected readonly paramMetadataBuilder = new ParamMetadataBuilder()
  protected readonly middlewareMetadataBuilder = new MiddlewareMetadataBuilder()
  protected readonly guardMetadataBuilder = new GuardMetadataBuilder()
  protected readonly pipeMetadataBuilder = new PipeMetadataBuilder()
  protected readonly interceptorMetadataBuilder = new InterceptorMetadataBuilder()

  public build(args: ActionMetadataArgs): ActionMetadata {
    const metadata = new ActionMetadata({
      type: args.type,
      route: args.route,
      controller: args.controller,
      property: args.property
    })

    for (const param of this.storage.params) {
      if (param.controller !== args.controller || param.property !== args.property) {
        continue
      }

      metadata.params.push(this.paramMetadataBuilder.build(param))
    }

    for (const middleware of this.storage.middlewares) {
      if (middleware.controller !== args.controller || middleware.property !== args.property) {
        continue
      }

      metadata.middlewares.push(this.middlewareMetadataBuilder.build(middleware))
    }

    for (const guard of this.storage.guards) {
      if (guard.controller !== args.controller || guard.property !== args.property) {
        continue
      }

      metadata.guards.push(this.guardMetadataBuilder.build(guard))
    }

    for (const pipe of this.storage.pipes) {
      if (pipe.controller !== args.controller || pipe.property !== args.property) {
        continue
      }

      metadata.pipes.push(this.pipeMetadataBuilder.build(pipe))
    }

    for (const interceptor of this.storage.interceptors) {
      if (interceptor.controller !== args.controller || interceptor.property !== args.property) {
        continue
      }

      metadata.interceptors.push(this.interceptorMetadataBuilder.build(interceptor))
    }

    for (const specification of this.storage.specifications) {
      if (
        specification.controller !== args.controller ||
        specification.property !== args.property
      ) {
        continue
      }

      switch (specification.specification.kind) {
        case SpecificationKind.Consume:
          metadata.consumes = specification.specification.type
          break
        case SpecificationKind.Produce:
          metadata.produces = specification.specification.type
          break
        case SpecificationKind.Response:
          metadata.responses.push(specification.specification)
          break
      }
    }

    return metadata
  }
}
