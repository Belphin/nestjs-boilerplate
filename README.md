<p align="right">
   <a href="https://nodejs.org/en/" target="_blank"><img src="https://img.shields.io/badge/Node.js-v20.12.0-brightgreen.svg" alt="Node Version" /></a>
</p>

# NestJS Project Structure

This is a NestJS project boilerplate with Firebase for authentication and MongoDB as the database. It also includes Swagger for documentation.

```
/
├── .env                                      # Environment variables
├── .gitignore                                # Git ignore file
├── .eslintrc.js                              # ESLint configuration
├── .prettierrc                               # Prettier configuration
├── nest-cli.json                             # Nest CLI configuration
├── package.json                              # Project dependencies and scripts
├── tsconfig.build.json                       # TypeScript build configuration
├── tsconfig.json                             # TypeScript configuration
│
└── src/                                      # Source code
    ├── main.ts                               # Entry point of the application
    ├── app.module.ts                         # Main application module
    |
    ├── configs/                              # Configuration files
    │   ├── env.config.ts                     # Validates environment variables
    │   |── firebase.config.ts                # Firebase configuration
    │   └── swagger.config.ts                 # Swagger documentation configuration
    │
    ├── decorators/                           # Global decorators
    │   └── api-responses-doc.decorator.ts    # Decomposed swagger documentation decorators
    │
    ├── guards/                               # Global guards
    │   └── firebase-auth.guard.ts            # Firebase authentication guard
    |
    ├── types/                                # Global types
    │   └── docs.types.ts                     # Types related to swagger documentation
    |
    └── modules/                              # Application modules
        ├── firebase/                         # Firebase module
        │   ├── firebase.module.ts            # Firebase module definition
        │   └── firebase.service.ts           # Firebase service
        |
        └── user/                             # User module
            ├── user.module.ts                # User module definition
            ├── user.controller.ts            # User controller
            ├── user.service.ts               # User service
            ├── user.responses.ts             # User endpoints documentation file
            |
            ├── decorators/                   # User decorators
            |   └── ...
            |
            ├── dtos/                         # User data transfer objects
            |   └── ...
            |
            └── schemas/                      # Database schemas for User
                └── ...
```

## Documentation Maintenance

To write documentation for a specific endpoint, you need to add the `ApiResponsesDoc` decorator to the endpoint and pass the response schema for that endpoint:

```typescript
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
```

For example:

```typescript
getUser: {
    summary: 'Retrieve User',
    requiresAuth: true,
    okResponse: {
      result: exampleUser,
      message: 'User successfully retrieving',
    },
    notFoundMessage: 'User not found',
  },
```

Response schemas for each controller should be stored in a separate file named `<controller name>.responses.ts`, preferably as a Record specifying the type `ApiResponsesSchemasRecord`. For example:

```
export const userResponseExamples: ApiResponsesSchemasRecord = {
  getUser: {...},
  createUser: {...},
  updateUser: {...},
  disableUser: {...},
};
```

If there are multiple such files, create a folder named `responses` to organize them.

## Initialization

To get started with this boilerplate, follow these steps:

1. **Clone the Repository**:

   ```
   git clone https://github.com/Belphin/nestjs-boilerplate.git
   cd nestjs-boilerplate
   ```

2. **Install Dependencies**:
   Ensure you have Node.js installed (preferably version 20.12.0 or higher). Run the following command to install the required dependencies:

   ```
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory of the project. Use the `.env.example` file as a reference to define your environment variables. Make sure to configure your Firebase and MongoDB credentials.

4. **Start the Development Server**:
   You can start the application in development mode by running:
   `npm run start:dev`

5. **Access the Application**:
   Once the server is running, you can access the application at `http://localhost:PORT`.

6. **API Documentation**:
   Swagger documentation will be available at `http://localhost:PORT/api` for exploring the available endpoints and testing the API.
