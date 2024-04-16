import { IAction } from './action.interface'

export interface IMiddleware {
  use(action: IAction): void | Promise<void>
}
