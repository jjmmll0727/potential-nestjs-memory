import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { UserEntity } from '@app/database/entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresModule } from '@app/database';

@Module({
  imports: [PostgresModule, TypeOrmModule.forFeature([UserEntity])],
  providers: [AccountResolver, AccountService]
})
export class AccountModule {}
