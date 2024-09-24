import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiResponsesSchema } from 'types/docs.types';

export function ApiResponsesDoc<T = undefined>(schema: ApiResponsesSchema<T>) {
  const decorators = [];

  if (schema.summary) {
    decorators.push(ApiOperation({ summary: schema.summary }));
  }

  if (schema.body) {
    decorators.push(ApiBody({ type: schema.body }));
  }

  if (schema.query) {
    decorators.push(ApiQuery({ type: schema.query }));
  }

  if (schema.pathParam) {
    decorators.push(ApiParam(schema.pathParam));
  }

  if (schema.okResponse) {
    decorators.push(
      ApiOkResponse({
        description: 'OK',
        schema: {
          example: schema.okResponse,
        },
      }),
    );
  }

  if (schema.createdResponse) {
    decorators.push(
      ApiCreatedResponse({
        description: 'Created',
        schema: {
          example: schema.createdResponse,
        },
      }),
    );
  }

  if (schema.badRequestMessage) {
    decorators.push(
      ApiBadRequestResponse({
        description: 'Bad Request',
        schema: {
          example: {
            message: schema.badRequestMessage,
            error: 'Bad Request',
            statusCode: 400,
          },
        },
      }),
    );
  }

  if (schema.notFoundMessage) {
    decorators.push(
      ApiNotFoundResponse({
        description: 'Not Found',
        schema: {
          example: {
            message: schema.notFoundMessage,
            error: 'Not Found',
            statusCode: 404,
          },
        },
      }),
    );
  }

  if (schema.conflictMessage) {
    decorators.push(
      ApiConflictResponse({
        description: 'Conflict',
        schema: {
          example: {
            message: schema.conflictMessage,
            error: 'Conflict',
            statusCode: 409,
          },
        },
      }),
    );
  }

  if (schema.requiresAuth) {
    decorators.push(ApiBearerAuth());
    decorators.push(
      ApiUnauthorizedResponse({
        description: 'Unauthorized',
        schema: {
          example: {
            message: 'Unauthorized access',
            error: 'Unauthorized',
            statusCode: 401,
          },
        },
      }),
    );
  }

  return applyDecorators(...decorators);
}
