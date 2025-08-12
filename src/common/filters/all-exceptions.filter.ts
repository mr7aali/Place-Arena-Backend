import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message: string | string[] = 'Internal server error';

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      // Handle validation errors from class-validator
      if (statusCode === 400 && typeof exceptionResponse === 'object') {
        const { message: validationMessages, error } =
          exceptionResponse as Record<string, any>;
        message = validationMessages;
      } else {
        message = exception.message;
      }
    } else if (exception instanceof Error) {
      message = exception.message;
      console.log(exception);
    }
    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
      exception: exception,
    });
  }
}
