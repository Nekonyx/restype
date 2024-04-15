import { IDriver, IDriverOptions } from '../driver'

import type Router from '@koa/router'
import type { Middleware } from 'koa'

export interface IKoaDriverOptions extends IDriverOptions<KoaDriver> {
  router: Router
}

export class KoaDriver implements IDriver {
  private readonly router: Router

  public constructor(opts: IKoaDriverOptions) {
    this.router = opts.router
  }

  public async setup() {
    //
  }

  public getHandlers(): Middleware[] {
    return []
  }
}
