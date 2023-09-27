import dotenv from 'dotenv';
import { createServer } from 'http';
import Message from './entities/Message';
import { MessageRepository } from './repositories/MessageRepository';
import { MessageService } from './useCases/MessageService';
import dbConnection from './config/db';
import socketConfig from './config/socketConfig';

dotenv.config();

const httpServer = createServer();

dbConnection(process.env.DATABASE_URL as string).then((d) => {
  const messageModel = Message;
  const messageRepository = new MessageRepository(messageModel);
  const messageService = new MessageService(messageRepository);
  
  socketConfig(httpServer, messageService);

  httpServer.listen(process.env.PORT || 3333);
}).catch((err) => {
  console.error("Something went wrong");
});
