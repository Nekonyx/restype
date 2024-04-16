import type { Application, RequestHandler } from 'express'

import { IAction } from '../../interfaces/action.interface'
import { IContext } from '../../interfaces/context.interface'
import { IDriverSetupParams } from '../../interfaces/driver.interface'
import { DriverBase } from '../driver-base'

export interface IExpressDriverOptions {
  app: Application
}

export class ExpressDriver extends DriverBase {
  public createContext(): IContext {
    throw new Error('Method not implemented.')
  }
  public createAction(): IAction {
    throw new Error('Method not implemented.')
  }
  protected readonly app: Application
  protected readonly handlers: RequestHandler[] = []

  public constructor(opts: IExpressDriverOptions) {
    super()
    this.app = opts.app
  }

  public setup(params: IDriverSetupParams) {
    //
  }

  public getHandlers(): RequestHandler[] {
    return this.handlers
  }
}
