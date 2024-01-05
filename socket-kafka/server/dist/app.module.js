"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const gateway_1 = require("./ws/gateway-kor/gateway");
const ws_module_1 = require("./ws/gateway-kor/ws.module");
const ws_module_2 = require("./ws/gateway-usa/ws.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [ws_module_1.WsKorModule, ws_module_2.WsUsaModule],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, gateway_1.WsKorGateway, common_1.Logger],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map