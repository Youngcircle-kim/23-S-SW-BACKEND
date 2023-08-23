import { Resume } from 'src/web-push/entities/resume.entity';
import { User } from 'src/web-push/entities/user.entity';

export class CreateCommentDto {
  comment: string;
  major: number;
  User: User;
  Resume: Resume;
}
