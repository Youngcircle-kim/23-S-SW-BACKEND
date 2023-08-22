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
    orgin: 'localhost:3000', // 클라이언트의 주소 'localhost:3000'를 허용하는 CORS 설정
  },
})
export class EventsGateway {
  @WebSocketServer() server: Server; // WebSocket 서버를 주입하는 속성

  private activeSockets: { room: string; id: string }[] = []; // 활성 소켓 정보를 저장하는 배열

  // 'joinRoom' 이벤트에 대한 구독자를 만듭니다.
  @SubscribeMessage('joinRoom')
  joinRoom(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() room: string,
  ): void {
    // 현재 소켓 정보 배열에서 해당 방과 클라이언트 id를 가진 소켓 정보를 찾습니다.
    client.to(room).emit('welcome', room);

    client.join(room);
    console.log(`${room}방의, ${client.id} 입장`);
  }

  @SubscribeMessage('call-user')
  callUser(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() data: { room: string; offer: any },
  ): void {
    client.to(data.room).emit('call-made', data.offer, data.room);
    console.log(`${data.room}방을 받고, ${data.offer} 라는 offer을 받았습니다`);
    console.log('offer 받았고, peer B에 보냅니다');
  }

  @SubscribeMessage('call-answer')
  callAnswer(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() data: { room: string; answer: any },
  ): void {
    client.to(data.room).emit('answer-get', data.answer, data.room);
    console.log(`${data.room}방에서, ${data.answer} 라는 answer을 받았습니다`);
    console.log('answer을 peer A에게 전달합니다');
  }

  @SubscribeMessage('ice')
  iceCandidate(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() data: { room: any; ice: any },
  ): void {
    console.log(`${data.room}방을 받고, ${data.ice} 라는 ice를 받았습니다`);
    client.to(data.room).emit('ice', data.ice, data.room);
    console.log(`${client.id}에게서 ice들을 받아옴`);
  }

  @SubscribeMessage('leave')
  leaveRoom(
    @ConnectedSocket() client: Socket, // 클라이언트 소켓 객체를 매개변수로 받습니다.
    @MessageBody() room: string,
  ): void {
    client.leave(room);
    console.log(` ${client.id}가 ${room}을 떠났습니다.`);
  }
}
