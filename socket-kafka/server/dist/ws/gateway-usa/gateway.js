"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WsUsaGateway = void 0;
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let WsUsaGateway = class WsUsaGateway {
    constructor(logger) {
        this.logger = logger;
    }
    afterInit(server) {
        this.logger.log('usa ws gateway started!');
    }
    handleConnection(client, ...args) {
        this.logger.log('usa connected!');
        console.log(client.id);
    }
    handleDisconnect(client) {
        this.logger.log('usa disConnected!');
        console.log(client.id);
    }
    subMessage(message) {
        const rand = Math.floor(Math.random() * 10);
        if (rand % 2 == 0)
            this.wsServer.emit('sub-message-kor', message);
        else
            this.wsServer.emit('sub-message-usa', message);
    }
    pubMessage(message) {
        console.log('sub usa message - ', message);
    }
};
exports.WsUsaGateway = WsUsaGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", typeof (_b = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _b : Object)
], WsUsaGateway.prototype, "wsServer", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('pub-message-usa'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WsUsaGateway.prototype, "subMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('pub-message-usa'),
    __param(0, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], WsUsaGateway.prototype, "pubMessage", null);
exports.WsUsaGateway = WsUsaGateway = __decorate([
    (0, websockets_1.WebSocketGateway)(81),
    __metadata("design:paramtypes", [typeof (_a = typeof common_1.Logger !== "undefined" && common_1.Logger) === "function" ? _a : Object])
], WsUsaGateway);
//# sourceMappingURL=gateway.js.map