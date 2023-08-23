import { Resume } from 'src/web-push/entities/resume.entity';

export class ResponseResumeDto {
  private readonly resumeId: number;

  private readonly resumeText: string;

  private readonly isVisuable: boolean;

  private readonly User: number;

  constructor(
    resumeId: number,
    resumeText: string,
    isVisuable: boolean,
    User: number,
  ) {
    this.resumeId = resumeId;
    this.resumeText = resumeText;
    this.isVisuable = isVisuable;
    this.User = User;
  }

  static from(resume: Resume): ResponseResumeDto {
    const User = resume.User.id;
    return new ResponseResumeDto(
      resume.id,
      resume.resumeText,
      resume.isVisuable,
      User,
    );
  }
}
