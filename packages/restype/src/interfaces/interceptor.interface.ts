import { IAction } from './action.interface'

export interface IInterceptor {
  intercept(action: IAction, value: any): any | Promise<any>
}
