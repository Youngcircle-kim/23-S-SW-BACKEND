import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

// WebSocketGateway 데코레이터를 사용하여 WebSocketGateway 클래스를 정의합니다.

@WebSocketGateway({
  cors: {
    origin: 'localhost:3000', // 클라이언트의 주소 'localhost:3000'를 허용하는 CORS 설정
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server; // WebSocket 서버를 주입하는 속성
  private readonly MAXIMUM = 2;
  // 어떤 방에 어떤 유저가 들어있는지
  private users = {};
  // socket.id기준으로 어떤 방에 들어있는지
  private socketRoom = {};

  // 'joinRoom' 이벤트에 대한 구독자를 만듭니다.
  @SubscribeMessage('joinRoom')
  joinRoom(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() room: string,
  ): void {
    console.log(`joinRoom`);
    // 방이 기존에 생성되어 있다면
    if (this.users[room]) {
      // 현재 입장하려는 방에 있는 인원수
      const currentRoomLength = this.users[room].length;
      if (currentRoomLength === this.MAXIMUM) {
        // 인원수가 꽉 찼다면 돌아갑니다.
        console.log(`room full`);
        client.to(client.id).emit('room_full');
        return;
      }

      // 여분의 자리가 있다면 해당 방 배열에 추가해줍니다.
      this.users[room] = [...this.users[room], { id: client.id }];
    } else {
      // 방이 존재하지 않다면 값을 생성하고 추가해줍시다.
      this.users[room] = [{ id: client.id }];
    }
    this.socketRoom[client.id] = room;

    // 입장
    client.join(room);

    // 입장하기 전 해당 방의 다른 유저들이 있는지 확인하고
    // 다른 유저가 있었다면 offer-answer을 위해 알려줍니다.
    const others = this.users[room].filter((user) => user.id !== client.id);
    if (others.length) {
      console.log(`alarm ${client.id}, `);
      this.server.sockets.to(client.id).emit('all_users', others);
    }
  }

  @SubscribeMessage('offer')
  callUser(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() data: { room: string; offer: any },
  ): void {
    console.log(`offer`);
    client.to(data.room).emit('getOffer', data.offer);
    console.log(`received ${data.room}, ${data.offer}`);
  }

  @SubscribeMessage('answer')
  callAnswer(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() data: { room: string; answer: any },
  ): void {
    console.log(`answer`);
    client.to(data.room).emit('getAnswer', data.answer);
    console.log(`received ${data.room}, ${data.answer}`);
  }

  @SubscribeMessage('candidate')
  iceCandidate(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() data: { room: any; ice: any },
  ): void {
    console.log(`candidate`);
    client.to(data.room).emit('getCandidate', data.ice);
    console.log(`received ${data.room}, ${data.ice}`);
  }

  handleDisconnect(@ConnectedSocket() client: Socket): void {
    console.log(`hadleDisconnect`);
    // 방을 나가게 된다면 socketRoom과 users의 정보에서 해당 유저를 지워줍니다.
    const roomID = this.socketRoom[client.id];

    if (this.users[roomID]) {
      this.users[roomID] = this.users[roomID].filter(
        (user) => user.id !== client.id,
      );
      if (this.users[roomID].length === 0) {
        delete this.users[roomID];
        return;
      }
    }
    console.log(`leave ${client.id}`);
    delete this.socketRoom[client.id];
    client.broadcast
      .to(this.users[roomID])
      .emit('user_exit', { id: client.id });
  }
}
