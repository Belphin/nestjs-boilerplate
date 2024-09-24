import { UsernameValidation } from '../decorators/username-validation.decorator';

export class CreateUserDto {
  @UsernameValidation(true)
  username: string;
}
