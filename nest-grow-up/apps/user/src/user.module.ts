import { Module } from '@nestjs/common';
import { PostgresqlModule } from 'libs/database/src/postgresql.module';
import { UserRepository } from './repository/user.repository';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [PostgresqlModule],
  controllers: [UserController],
  providers: [UserService, UserRepository],
})
export class UserModule {}
