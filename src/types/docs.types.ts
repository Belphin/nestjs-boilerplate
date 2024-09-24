import { ApiParamOptions } from '@nestjs/swagger';

export type SuccessResponse<T = undefined> = T extends undefined
  ? { message: string }
  : { result: T; message: string };

export type ApiResponsesSchema<T = any> = {
  summary?: string;
  okResponse?: SuccessResponse<T>;
  createdResponse?: SuccessResponse<T>;
  notFoundMessage?: string;
  badRequestMessage?: string | string[];
  conflictMessage?: string;
  requiresAuth?: boolean;
  body?: new () => T;
  query?: new () => T;
  pathParam?: ApiParamOptions;
};

export type ApiResponsesSchemasRecord = Record<string, ApiResponsesSchema>;
