import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';

@WebSocketGateway()
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  private activeSockets: { room: string; id: string }[] = [];

  @SubscribeMessage('joinRoom')
  joinRoom(client: Socket, room: string): void {
    try {
      /*
      client.join(room);
      client.emit('joinedRoom', room);
      */
      console.log('joinRoom');

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

        console.log(`Enter ${client.id} in ${room}`);

        client.broadcast.emit(`${room}-add-user`, {
          user: client.id,
        });
      }
    } catch (err) {
      console.error(err);
    }

    /*
    client.join(room);
    client.emit('joinedRoom', room);
    */
  }

  @SubscribeMessage('call-user')
  callUser(client: Socket, data: any): void {
    console.log(data.offer, client.id);
    client.to(data.to).emit('call-made', {
      offer: data.offer,
      socket: client.id,
    });
  }

  @SubscribeMessage('make-answer')
  makeAnswer(client: Socket, data: any): void {
    console.log(data.answer, client.id, data.to);
    client.to(data.to).emit('answer-made', {
      socket: client.id,
      answer: data.answer,
    });
  }

  @SubscribeMessage('reject-call')
  rejectCall(client: Socket, data: any): void {
    console.log(client.id);
    client.to(data.from).emit('call-rejected', {
      socket: client.id,
    });
  }

  @SubscribeMessage('ice')
  iceCandidate(client: Socket, data: any): void {
    console.log(data.ice, client.id, data.from);
    const { ice } = data;
    client.to(data.from).emit('ice', ice);
  }

  afterInit(): void {
    console.log(`Init!`);
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    console.log(`connected ${socket.id}`);
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
