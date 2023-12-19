import { Module } from '@nestjs/common';
import { USER_FACTORY } from 'libs/common/src/factory/client.proxy';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [USER_FACTORY],
})
export class UserModule {}
