import { IMessage } from "../entities/Message";
import { MessageRepository } from "../repositories/MessageRepository";

export class MessageService {
  private messageRepository: MessageRepository;

  constructor(messageRepository: MessageRepository) {
    this.messageRepository = messageRepository;
  }

  async getAllMessages(): Promise<IMessage[]> {
    return this.messageRepository.getAllMessage();
  }

  async sendMessage({ author, message }: IMessage): Promise<IMessage> {
    const newMessage = { author, message } as IMessage;
    return this.messageRepository.createMessage(newMessage);
  }
}