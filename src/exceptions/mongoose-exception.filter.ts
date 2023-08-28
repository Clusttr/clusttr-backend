import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { Error as MongooseError } from "mongoose";

@Catch(MongooseError)
export class MongooseExceptionFilter implements ExceptionFilter {

    catch(exception: MongooseError, host: ArgumentsHost) {
        const ctx = host.switchToHttp()
        const response = ctx.getResponse()
        const status = this.getHttpStatus(exception)
        const message = this.getErrorMessage(exception)

        console.log({expection: "There was hit"})
        response.status(status).json({
            status,
            message
        })
    }

    private getHttpStatus(exception: MongooseError): HttpStatus {
        switch (exception.name) {
            case "MongoError":
                return HttpStatus.CONFLICT;
            case "ValidationError":
                return HttpStatus.BAD_REQUEST;
            default:
                return HttpStatus.INTERNAL_SERVER_ERROR;
        }
    }

    private getErrorMessage(exception: MongooseError): string {
        switch (exception.name) {
            case "MongoError":
                return "Duplicate key error";
            case "ValidationError":
                return exception.message;
            default:
                return 'Internal Server Error';
        }
    }
}