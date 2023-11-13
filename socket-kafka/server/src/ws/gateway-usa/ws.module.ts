import { Logger, Module } from "@nestjs/common";
import { WsUsaGateway } from "./gateway";

@Module({
    providers: [WsUsaGateway, Logger]
})
export class WsUsaModule {

}