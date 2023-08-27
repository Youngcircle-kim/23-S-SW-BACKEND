import { User } from 'src/web-push/entities/user.entity';

export class CreateResumeDto {
  resumeText: string;

  isVisuable: boolean;

  title: string;

  userId: User;
}
