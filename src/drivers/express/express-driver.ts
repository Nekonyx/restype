import { Restype } from '../../restype'
import { IDriver } from '../driver'

export class ExpressDriver implements IDriver {
  public constructor(restype: Restype<ExpressDriver>) {
    //
  }

  public getHandler() {
    throw new Error('Method not implemented.')
  }
}
