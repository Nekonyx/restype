import type { Context, Next, Request } from 'koa'
import { IContext } from '../../interfaces/context.interface'

export interface IKoaContext extends IContext {
  req: Request
  ctx: Context
  next: Next
}
