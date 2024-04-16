import { IDriver, IDriverSetupParams } from '../interfaces/driver.interface'

export abstract class DriverBase implements IDriver {
  /**
   * @inheritdoc
   */
  public abstract setup(params: IDriverSetupParams): void | Promise<void>

  /**
   * @inheritdoc
   */
  public abstract getHandlers(): any[]

}
