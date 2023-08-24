import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/web-push/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtKakaoStrategy } from './kakao/jwt-social-kakao.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, JwtKakaoStrategy],
})
export class AuthModule {}
