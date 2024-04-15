export type GuardCtor = new (...args: any[]) => IGuard

export interface IGuard {
  canActivate(req: any, res: any, next: any): boolean | Promise<boolean>
}
