import { Constructable } from '../../types/constructable'

export interface ControllerMetadataArgs {
  /**
   * The controller class.
   */
  controller: Constructable<any>
  /**
   * The route of the controller.
   */
  route: string
}
