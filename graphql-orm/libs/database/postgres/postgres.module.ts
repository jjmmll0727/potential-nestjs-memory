import { Module } from '@nestjs/common';
import { getMetadataArgsStorage } from 'typeorm';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'jami',
        port: 5433,
        username: 'jami',
        password: 'jami',
        database: 'postgres',
        schema: 'public',
        keepConnectionAlive: true,
        entities: getMetadataArgsStorage().tables.map((tbl) => tbl.target),
        migrations: [],
        subscribers: [],
        synchronize: false,
        maxQueryExecutionTime: 10000, // 10초가 지나면 지연 로그 찍힘
        extra: {
          statement_timeout: 10000, // 10초가 지나면 쿼리가 자동 중단됨
          max: 15,
          maxUses: 5000,
          connectionTimeoutMillis: 5000,
          idleTimeoutMillis: 1000,
        },
      }),
    }),
  ],
})
export class PostgresModule {}
