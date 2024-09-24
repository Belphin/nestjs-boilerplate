import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export function UsernameValidation(required: boolean = true) {
  return applyDecorators(
    ApiProperty({
      description: 'The username of the user.',
      example: 'john_doe',
    }),
    required ? IsNotEmpty({ message: 'username is required' }) : IsOptional(),
    IsString({ message: 'username must be a string' }),
    Length(4, 20, { message: 'Username must be between 4 and 20 characters' }),
    Matches(/^[a-zA-Z0-9_]+$/, {
      message: 'Username can only contain letters, numbers, and underscores',
    }),
  );
}
