import { ApiResponsesSchemasRecord } from 'types/docs.types';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

export const exampleUser = {
  _id: '607c35d2f1b2b54c1c8b4567',
  uid: 'firebase-uid-12345',
  username: 'john_doe',
  __v: 0,
};

export const userResponseExamples: ApiResponsesSchemasRecord = {
  getUser: {
    summary: 'Retrieve User',
    requiresAuth: true,
    okResponse: {
      result: exampleUser,
      message: 'User successfully retrieving',
    },
    notFoundMessage: 'User not found',
  },
  createUser: {
    summary: 'Create User',
    requiresAuth: true,
    body: CreateUserDto,
    createdResponse: {
      result: exampleUser,
      message: 'User successfully created',
    },
    badRequestMessage: [
      'username is required',
      'username must be a string',
      'Username must be between 4 and 20 characters',
      'Username can only contain letters, numbers, and underscores',
    ],
    conflictMessage: 'User already exist',
  },
  updateUser: {
    summary: 'Update User',
    requiresAuth: true,
    body: UpdateUserDto,
    okResponse: { result: exampleUser, message: 'User successfully updated' },
    badRequestMessage: [
      'Username must be between 4 and 20 characters',
      'Username can only contain letters, numbers, and underscores',
    ],
  },
  disableUser: {
    summary: 'Disable User',
    requiresAuth: true,
    okResponse: { message: 'User successfully deleted' },
  },
};
