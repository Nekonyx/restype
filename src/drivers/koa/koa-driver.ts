import { Restype } from '../../restype'
import { IDriver } from '../driver'

export class KoaDriver implements IDriver {
  public constructor(restype: Restype<KoaDriver>) {
    //
  }

  public getHandler() {
    throw new Error('Method not implemented.')
  }
}
