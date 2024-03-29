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
//         database: 'nest-grow-up2',
//         schema: 'public',
//         keepConnectionAlive: true,
//         entities: [GymEntity],
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
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions => ({
        name: 'two',
        type: 'postgres',
        host: 'localhost',
        port: 5433,
        username: 'jami',
        password: 'jami',
        database: 'nest-grow-up2',
        schema: 'public',
        keepConnectionAlive: true,
        entities: [GymEntity],
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
      name: 'two',
    }),
  ],
})
export class Postgresql2Module {}
