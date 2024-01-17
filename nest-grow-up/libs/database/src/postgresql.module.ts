import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CompanyEntity, GymEntity, PostEntity, UserEntity } from './entity';

// @Module({
//   imports: [
//     TypeOrmModule.forRootAsync({
//       useFactory: () => ({
//         type: 'postgres',
//         host: 'localhost',
//         port: 5433,
//         username: 'jami',
//         password: 'jami',
//         database: 'nest-grow-up',
//         schema: 'public',
//         keepConnectionAlive: true,
//         entities: [UserEntity, CompanyEntity, PostEntity],
//         migrations: [],
//         subscribers: [],
//         synchronize: true,
//         maxQueryExecutionTime: 10000, // 10초가 지나면 지연 로그 찍힘
//         extra: {
//           statement_timeout: 10000, // 10초가 지나면 쿼리가 자동 중단됨
//           max: 15,
//           maxUses: 5000,
//           connectionTimeoutMillis: 5000,
//           idleTimeoutMillis: 1000,
//         },
//         logger: 'debug',
//       }),
//     }),
//   ],
// })
// export class PostgresqlModule {}

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'jami',
        password: 'jami',
        database: 'nest-grow-up',
        schema: 'public',
        keepConnectionAlive: true,
        entities: [UserEntity, PostEntity, CompanyEntity],
        migrations: [],
        subscribers: [],
        synchronize: true,
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
    // TypeOrmModule.forRootAsync({
    //   useFactory: (): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5433,
    //     username: 'jami',
    //     password: 'jami',
    //     database: 'nest-grow-up',
    //     schema: 'public2',
    //     keepConnectionAlive: true,
    //     entities: [GymEntity],
    //     migrations: [],
    //     subscribers: [],
    //     synchronize: true,
    //     maxQueryExecutionTime: 10000, // 10초가 지나면 지연 로그 찍힘
    //     extra: {
    //       statement_timeout: 10000, // 10초가 지나면 쿼리가 자동 중단됨
    //       max: 15,
    //       maxUses: 5000,
    //       connectionTimeoutMillis: 5000,
    //       idleTimeoutMillis: 1000,
    //     },
    //   }),
    // }),
  ],
})
export class PostgresqlModule {}
