import { Module } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { USER_FACTORY } from 'libs/common/src/factory/client.proxy';
import { UserController } from './user.controller';

@Module({
  controllers: [UserController],
  providers: [USER_FACTORY, EventEmitter2],
})
export class UserModule {}
