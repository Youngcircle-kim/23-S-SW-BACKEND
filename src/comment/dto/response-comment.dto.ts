import { Comment } from 'src/web-push/entities/comment.entity';

export class ResponseCommentDto {
  private readonly commentId: number;

  private readonly comment: string;

  private readonly User: number;

  private readonly Resume: number;

  constructor(
    commentId: number,
    comment: string,
    User: number,
    Resume: number,
  ) {
    this.commentId = commentId;
    this.comment = comment;
    this.User = User;
    this.Resume = Resume;
  }

  static from(comment: Comment): ResponseCommentDto {
    const User = comment.User.id;
    const Resume = comment.Resume.id;

    return new ResponseCommentDto(comment.id, comment.comment, User, Resume);
  }
}
