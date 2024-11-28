export class BaseResponse {
  data: any
  errors: string[]
  hasErrors: boolean
  statusCode: number

  constructor({ data, errors, hasErrors, statusCode }: any) {
    this.data = data || null
    this.errors = errors || []
    this.hasErrors = hasErrors || false
    this.statusCode = statusCode || 200
  }
}
