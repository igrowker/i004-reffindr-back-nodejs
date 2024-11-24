interface IBaseResponse<T> {
  data?: T
  errors: string[]
  hasErrors: boolean
  statusCode: number
}

export class BaseResponse<T> {
  constructor(response: IBaseResponse<T>) {
    return response
  }
}
