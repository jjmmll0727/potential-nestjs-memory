import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsKorModule } from './ws/gateway-kor/ws.module';
import { WsUsaModule } from './ws/gateway-usa/ws.module';

@Module({
  imports: [WsKorModule, WsUsaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
