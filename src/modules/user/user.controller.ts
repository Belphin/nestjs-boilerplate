import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiResponsesDoc } from 'decorators/api-responses-doc.decorator';
import { FirebaseAuthGuard } from 'guards/firebase-auth.guard';
import { FirebaseService } from 'modules/firebase/firebase.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { userResponseExamples } from './user.responses';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly userService: UserService,
  ) {}

  @Get()
  @UseGuards(FirebaseAuthGuard)
  @ApiResponsesDoc(userResponseExamples.getUser)
  async getUser(@Request() req) {
    const user = await this.userService.getUser(req.user.uid);
    return { result: user, message: 'User successfully retrieving' };
  }

  @Post()
  @UseGuards(FirebaseAuthGuard)
  @ApiResponsesDoc(userResponseExamples.createUser)
  async createUser(@Request() req, @Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(req.user.uid, createUserDto);
    return { result: user, message: 'User successfully created' };
  }

  @Patch()
  @UseGuards(FirebaseAuthGuard)
  @ApiResponsesDoc(userResponseExamples.updateUser)
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.updateUser(req.user.uid, updateUserDto);
    return { result: user, message: 'User successfully updated' };
  }

  @Delete()
  @UseGuards(FirebaseAuthGuard)
  @ApiResponsesDoc(userResponseExamples.disableUser)
  async disableUser(@Request() req) {
    await this.firebaseService.disableUser(req.user.uid);
    return { message: 'User successfully deleted' };
  }
}
