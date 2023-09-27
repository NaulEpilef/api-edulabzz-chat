import { Model } from "mongoose";
import { IMessage } from "../entities/Message";

export class MessageRepository {
  private messageModel: Model<IMessage>;

  constructor(messageModel: Model<IMessage>) {
    this.messageModel = messageModel;
  }

  async getAllMessage(): Promise<IMessage[]> {
    return await this.messageModel.find().exec();
  }

  async createMessage({ author, message }: IMessage): Promise<IMessage> {
    const newMessage = new this.messageModel({ author, message });
    return newMessage.save();
  }
}