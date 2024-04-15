import { IDriver, IDriverOptions } from '../driver'

import type { RequestHandler } from 'express'

export interface IExpressDriverOptions extends IDriverOptions<ExpressDriver> {
  //
}

export class ExpressDriver implements IDriver {
  public constructor(opts: IExpressDriverOptions) {
    //
  }

  public async setup() {
    //
  }

  public getHandlers(): RequestHandler[] {
    return []
  }
}
