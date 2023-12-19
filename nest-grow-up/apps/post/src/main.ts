import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { PostModule } from './post.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    PostModule,
    {
      transport: Transport.TCP,
    },
  );
  await app.listen();
}
bootstrap();
