import { NestFactory } from '@nestjs/core';
import { WsAdapter } from '@nestjs/platform-ws';
import { AppModule } from './app.module';
import { RedisIoAdapter } from './ws/adapter/io-adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });

  // 1. io adapter init using socketIO
  const redisIoAdapter = new RedisIoAdapter(app);
  await redisIoAdapter.connectToRedis();
  app.useWebSocketAdapter(redisIoAdapter);

  // 2. ws adapter init using WS (faster then socketIO, lower skill then socketIO)
  // app.useWebSocketAdapter(new WsAdapter(app));


  await app.listen(3000);
}
bootstrap();
