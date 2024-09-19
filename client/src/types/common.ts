export type Meta = {
  count: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  page: number
  pageCount: number
  pageSize: number
}

export type ModifiedBy = {
  id: string
  fullName: string
  role: string
}

export type BaseAttribute<A> = {
  type: string
  attributes: A
}

export type BaseResponse<D> = {
  statusCode: number
  data: BaseAttribute<D>[]
  included: any
  count?: number
  meta?: Meta
}

export type BaseRequest<D> = {
  data: {
    attributes: D
  }
}
