import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  UseGuards,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('kakao')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get()
  @UseGuards(AuthGuard('kakao'))
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async kakaoAuth(@Req() _req: Request) {}

  @Get('/callback')
  @UseGuards(AuthGuard('kakao'))
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    return this.authService.kakaoLogin(req, res);
  }
}
