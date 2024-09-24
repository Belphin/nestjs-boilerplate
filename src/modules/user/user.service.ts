import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
  ) {}

  async getUser(firebaseId: string): Promise<UserDocument> {
    const user = await this.userModel.findOne({ uid: firebaseId });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(
    firebaseId: string,
    createUserDto: CreateUserDto,
  ): Promise<UserDocument> {
    try {
      const newUser = new this.userModel({
        ...createUserDto,
        uid: firebaseId,
      });
      return await newUser.save();
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('User already exist');
      }
      throw error;
    }
  }

  async updateUser(
    firebaseId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDocument> {
    return await this.userModel
      .findOneAndUpdate(
        { uid: firebaseId },
        { $set: updateUserDto },
        { new: true, upsert: false },
      )
      .exec();
  }
}
