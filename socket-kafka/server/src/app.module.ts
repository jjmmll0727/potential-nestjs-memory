import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WsKorGateway } from './ws/gateway-kor/gateway';
import { WsKorModule } from './ws/gateway-kor/ws.module';
import { WsUsaModule } from './ws/gateway-usa/ws.module';

@Module({
  imports: [WsKorModule, WsUsaModule],
  controllers: [AppController],
  providers: [AppService, WsKorGateway, Logger],
})
export class AppModule {}
