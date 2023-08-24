import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ResponseCommentDto } from './dto/response-comment.dto';
import { Comment } from '../web-push/entities/comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}
  async create(createCommentDto: CreateCommentDto) {
    const newComment: Comment = Comment.of(
      createCommentDto.comment,
      createCommentDto.major,
      createCommentDto.User,
      createCommentDto.Resume,
    );
    try {
      const savedComment = await this.commentRepository.save(newComment);

      return 'Success create new Field';
    } catch (err) {
      console.error(err);
      return 'Fail look at the console';
    }
  }

  async findAll() {
    const reservations: Comment[] = await this.commentRepository.find({
      relations: {
        User: true,
        Resume: true,
      },
    });

    return reservations.map(ResponseCommentDto.from);
  }

  async findOne(id: number) {
    const comment: Comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        User: true,
        Resume: true,
      },
    });

    if (comment === null) {
      throw new NotFoundException();
    }
    return ResponseCommentDto.from(comment);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const comment: Comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        User: true,
        Resume: true,
      },
    });
    if (updateCommentDto.comment !== null) {
      comment.comment = updateCommentDto.comment;
    }

    if (updateCommentDto.User !== null) {
      comment.User = updateCommentDto.User;
    }

    if (updateCommentDto.Resume !== null) {
      comment.Resume = updateCommentDto.Resume;
    }

    return `This action updates a #${id} comment`;
  }

  async remove(id: number) {
    const comment: Comment = await this.commentRepository.findOne({
      where: { id },
      relations: {
        User: true,
        Resume: true,
      },
    });
    this.commentRepository.remove(comment);
    return `This action removes a #${id} comment`;
  }
}
