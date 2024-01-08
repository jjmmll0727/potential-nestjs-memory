import { Module } from '@nestjs/common';
import { PostgresqlModule } from 'libs/database/src/postgresql.module';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Module({
  imports: [PostgresqlModule],
  controllers: [UserController],
  providers: [UserService, UserRepository, EventEmitter2],
})
export class UserModule {}
