import { IAction } from './action.interface'

export interface IGuard {
  canActivate(action: IAction): boolean | Promise<boolean>
}
