import { Module } from '@nestjs/common';
import { WebPushService } from './web-push.service';
import { WebPushController } from './web-push.controller';

@Module({
  controllers: [WebPushController],
  providers: [WebPushService],
})
export class WebPushModule {}