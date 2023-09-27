"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const socket_io_1 = require("socket.io");
const socketConfig = (httpServer, messageService) => {
    const io = new socket_io_1.Server(httpServer);
    io.on("connection", (socket) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`User connected: ${socket.id}`);
        io.emit("message", yield messageService.getAllMessages());
        socket.on("sendMessage", ({ author, message }) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("sendMessage");
            const t = yield messageService.sendMessage({ author, message });
            console.log(t);
            io.emit("message", yield messageService.getAllMessages());
        }));
        io.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    }));
};
exports.default = socketConfig;
