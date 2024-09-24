import { UsernameValidation } from '../decorators/username-validation.decorator';

export class UpdateUserDto {
  @UsernameValidation(false)
  username: string;
}
