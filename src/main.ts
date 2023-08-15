import * as webpush from 'web-push';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get<number>('SERVER_PORT'); //env에서 SERVER_PORT 가져오기.
  const mail_address = configService.get<string>('MAILTO');
  const public_key = configService.get<string>('PUBLIC_KEY');
  const private_key = configService.get<string>('PRIVATE_KEY');

  webpush.setVapidDetails(mail_address, public_key, private_key);

  // app.setGlobalPrefix('server'); // prefix는 Next에서 사용하는 api와 충돌을 피하기 위해 server로 설정.

  app.enableCors(); //cors 설정.
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(PORT);
}
bootstrap();
