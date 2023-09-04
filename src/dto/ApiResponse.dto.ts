export class ApiResponseDto<T> {
    data: T
    message: string
    success: Boolean
}