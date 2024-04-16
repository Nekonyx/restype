import { ActionType } from '../../constants/action'
import { Constructable } from '../../types/constructable'

export interface ActionMetadataArgs {
  type: ActionType
  route: string | RegExp
  controller: Constructable<any>
  property: string
}
