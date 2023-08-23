import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from '../web-push/entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), AuthModule],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
