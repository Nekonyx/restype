import type { NextFunction, Request, Response } from 'express'
import { IContext } from '../../interfaces/context.interface'

export interface IExpressContext extends IContext {
  req: Request
  res: Response
  next: NextFunction
}
