import { SpecificationKind } from '../constants/specification'

export type TagSpecification = {
  kind: SpecificationKind.Tag
  tag: string
}

export type ProduceSpecification = {
  kind: SpecificationKind.Produce
  type: string
}

export type ConsumeSpecification = {
  kind: SpecificationKind.Consume
  type: string
}

export type ResponseSpecification = {
  kind: SpecificationKind.Response
  status: number
  type: any
}

export type Specification =
  | ResponseSpecification
  | ConsumeSpecification
  | TagSpecification
  | ProduceSpecification
