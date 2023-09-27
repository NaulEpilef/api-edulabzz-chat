import mongoose, { Schema } from 'mongoose';
import { createServer } from 'http';
import { Server } from 'socket.io';

interface IMessage {
  author: string;
  message: string;
}

const httpServer = createServer();
const io = new Server(httpServer);

const dbUrl = 'mongodb+srv://naul:9vMUSIks3BEe5jIR@cluster0.uixg0of.mongodb.net/?retryWrites=true&w=majority';

const dbConnection = async () => {
  await mongoose.connect(dbUrl);
}

dbConnection();

const messageSchema = new Schema<IMessage>({
  author: { type: String, required: true },
  message: { type: String, required: true }
})
const Message = mongoose.model<IMessage>('Message', messageSchema);

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  const messages = await Message.find();

  io.emit("message", messages);

  io.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

httpServer.listen(3333);