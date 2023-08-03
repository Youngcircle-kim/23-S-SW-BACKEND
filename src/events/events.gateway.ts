import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    orgin: 'localhost:3000',
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server;

  private activeSockets: { room: string; id: string }[] = [];

  @SubscribeMessage('joinRoom')
  joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() room: string,
  ): void {
    const existingSocket = this.activeSockets?.find(
      (socket) => socket.room === room && socket.id === client.id,
    );

    if (!existingSocket) {
      this.activeSockets = [...this.activeSockets, { id: client.id, room }];
      client.emit(`${room}-update-user-list`, {
        users: this.activeSockets
          .filter((socket) => socket.room === room && socket.id !== client.id)
          .map((existingSocket) => existingSocket.id),
        current: client.id,
      });

      client.emit(`${room}-add-user`, {
        user: client.id,
      });
    }

    client.join(room);
    client.emit('joinedRoom', { room });
  }

  @SubscribeMessage('call-user')
  callUser(client: Socket, data: any): void {
    client.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: client.id,
    });
  }

  @SubscribeMessage('make-answer')
  makeAnswer(client: Socket, data: any): void {
    try {
      console.log(
        `${client.to(data.to).emit('answer-made', {
          socket: client.id,
          answer: data.answer,
        })}`,
      );
      client.to(data.to).emit('answer-made', {
        socket: client.id,
        answer: data.answer,
      });
    } catch (e) {
      console.error(e);
    }
  }

  @SubscribeMessage('reject-call')
  rejectCall(client: Socket, data: any): void {
    client.to(data.from).emit('call-rejected', {
      socket: client.id,
    });
  }

  @SubscribeMessage('ice')
  iceCandidate(client: Socket, data: any): void {
    const { ice } = data;
    client.to(data.from).emit('ice', ice);
  }

  afterInit(): void {
    console.log(`Init!`);
  }

  handleDisconnect(client: Socket): void {
    const existingSocket = this.activeSockets.find(
      (socket) => socket.id === client.id,
    );

    if (!existingSocket) return;

    this.activeSockets = this.activeSockets.filter(
      (socket) => socket.id !== client.id,
    );

    client.broadcast.emit(`${existingSocket.room}-remove-user`, {
      socketId: client.id,
    });

    console.log(`Client disconnected: ${client.id}`);
  }
}
