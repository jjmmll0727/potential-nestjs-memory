import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [{ provide: 'USER_SERVICE', useClass: UserService }],
})
export class UserModule {}
