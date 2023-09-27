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
exports.MessageRepository = void 0;
class MessageRepository {
    constructor(messageModel) {
        this.messageModel = messageModel;
    }
    getAllMessage() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.messageModel.find().exec();
        });
    }
    createMessage({ author, message }) {
        return __awaiter(this, void 0, void 0, function* () {
            const newMessage = new this.messageModel({ author, message });
            return newMessage.save();
        });
    }
}
exports.MessageRepository = MessageRepository;
