import { Module } from '@nestjs/common';
import { ProxyModule } from '../proxy/proxy.module';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';

@Module({
  imports: [ProxyModule],
  controllers: [GatewayController],
  providers: [GatewayService],
})
export class GatewayModule {}
