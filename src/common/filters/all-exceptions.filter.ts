import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  BadRequestException,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoError } from 'mongodb';
import mongoose from 'mongoose';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let statusCode = 500;
    let message: string | string[] = 'Internal server error';

    // Handle NestJS HttpException (e.g., BadRequestException, NotFoundException)
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (statusCode === 400 && typeof exceptionResponse === 'object') {
        const { message: validationMessages } = exceptionResponse as Record<
          string,
          any
        >;
        message = validationMessages;
      } else {
        message = exception.message;
      }
    }

    // Handle Mongoose Validation Errors
    else if (exception instanceof mongoose.Error.ValidationError) {
      statusCode = 400;
      message = Object.values(exception.errors).map((err: any) => err.message);
    }

    // Handle Mongoose CastError (invalid ObjectId)
    else if (exception instanceof mongoose.Error.CastError) {
      statusCode = 400;
      message = `Invalid ${exception.path}: ${exception.value}`;
    }

    // Handle Duplicate Key Error from MongoDB
    else if (exception instanceof MongoError && exception.code === 11000) {
      statusCode = 400;
      message = `Duplicate value for field(s): ${Object.keys(
        (exception as any).keyValue,
      ).join(', ')}`;
    }

    // Generic Error
    else if (exception instanceof Error) {
      message = exception.message;
    }

    response.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  }
}
