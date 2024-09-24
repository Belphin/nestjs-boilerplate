import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { validate } from 'configs/env.config';
import { FirebaseModule } from 'modules/firebase/firebase.module';
import { UserModule } from 'modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
      validate: validate,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI),
    FirebaseModule,
    UserModule,
  ],
  controllers: [],
})
export class AppModule {}
