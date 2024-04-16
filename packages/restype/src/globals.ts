import { MetadataArgsStorage } from './metadata/args/metadata-args-storage'
import { Constructable } from './types/constructable'

export function getMetadataArgsStorage(): MetadataArgsStorage {
  console.log('getMetadataArgsStorage called', new Error().stack?.split('\n')[2].trim())
  return MetadataArgsStorage.instance
}

export function isConstructable<T>(value: any): value is Constructable<T> {
  return Boolean(typeof value === 'function' && value.constructor)
}
