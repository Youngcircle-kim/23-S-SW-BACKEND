import { log } from 'console';
import { Comment } from 'src/web-push/entities/comment.entity';

export class ResponseCommentDto {
  private readonly commentId: number;

  private readonly comment: string;

  private readonly userId: number;

  private readonly resume: number;

  constructor(
    commentId: number,
    comment: string,
    userId: number,
    resume: number,
  ) {
    this.commentId = commentId;
    this.comment = comment;
    this.userId = userId;
    this.resume = resume;
  }

  static from(comment: Comment): ResponseCommentDto {
    const userId = comment.User.id;
    log(comment.Resume);
    const resume = comment.Resume.id;

    return new ResponseCommentDto(comment.id, comment.comment, userId, resume);
  }
}
