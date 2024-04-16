import { IAction } from './action.interface'

export interface IPipe {
  transform(action: IAction, value: any): any | Promise<any>
}
