import { Logger, Module } from "@nestjs/common";
import { WsKorGateway } from "./gateway";

@Module({
    providers: [WsKorGateway, Logger]
})
export class WsKorModule {

}