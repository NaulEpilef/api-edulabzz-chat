import { Server as HttpServer } from "http";
import { Server } from "socket.io";
import { MessageService } from "../useCases/MessageService";
import { IMessage } from "../entities/Message";

const socketConfig = (httpServer: HttpServer, messageService: MessageService) => {
  const io = new Server(httpServer);

  io.on("connection", async (socket) => {
    console.log(`User connected: ${socket.id}`);
  
    io.emit("message", await messageService.getAllMessages());

    socket.on("sendMessage", async ({ author, message }) => {
      console.log("sendMessage");
      const t = await messageService.sendMessage({ author, message } as IMessage);
      console.log(t);

      io.emit("message", await messageService.getAllMessages());
    });
  
    io.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}

export default socketConfig;