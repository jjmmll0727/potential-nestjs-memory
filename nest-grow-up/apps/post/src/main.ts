import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PostModule } from './post.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PostModule,
    {
      transport: Transport.TCP,
      options: {
        host: '127.0.0.1',
        port: 8082,
      },
    },
  );
  await app.listen();
}
bootstrap();
