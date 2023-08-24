import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/web-push/entities/user.entity';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}
  async kakaoLogin(req: Request, res: Response): Promise<any> {
    try {
      const { user } = req.body;

      // 유저 중복 검사

      const findUser = await this.userRepository.findOne({ where: user.email });

      if (!findUser) {
        const createUser = this.userRepository.create(user);
        await this.userRepository.save(createUser);
      }

      // 카카오 가입이 되어 있는 경우 accessToken 및 refreshToken 발급
      const findUserPayload = { id: findUser.id };

      const accessToken = jwt.sign(
        findUserPayload,
        this.configService.get('JWT_ACCESS_TOKEN_SECRET_KEY'),
        {
          expiresIn: +this.configService.get(
            'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
          ),
        },
      );

      return {
        ok: true,
        accessToken,
      };
    } catch (error) {
      return { ok: false, error: '구글 로그인 인증을 실패 하였습니다.' };
    }
  }
}
