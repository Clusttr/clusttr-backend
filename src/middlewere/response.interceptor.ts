import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";
import { ApiResponseDto } from "src/dto/ApiResponse.dto";

export class ResponseInterceptor<T> implements NestInterceptor<T, ApiResponseDto<T>> {

    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ApiResponseDto<T>> {
        return next.handle().pipe(map(data => ({data, message: "success", success: true})))
    }
}