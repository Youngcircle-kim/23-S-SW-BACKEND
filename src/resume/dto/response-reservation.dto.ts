import { Resume } from 'src/web-push/entities/resume.entity';

export class ResponseResumeDto {
  private readonly resumeId: number;

  readonly resumeText: string;

  readonly isVisuable: boolean;

  readonly userId: number;

  readonly title: string;

  readonly createdAt: Date;

  readonly image: string;

  constructor(
    resumeId: number,
    resumeText: string,
    isVisuable: boolean,
    userId: number,
    title: string,
    createdAt: Date,
    image: string,
  ) {
    this.resumeId = resumeId;
    this.resumeText = resumeText;
    this.isVisuable = isVisuable;
    this.userId = userId;
    this.title = title;
    this.createdAt = createdAt;
    this.image = image;
  }

  static from(resume: Resume): ResponseResumeDto {
    const User = resume.User.id;
    const image = resume.User.image;
    return new ResponseResumeDto(
      resume.id,
      resume.resumeText,
      resume.isVisuable,
      User,
      resume.title,
      resume.createdAt,
      image,
    );
  }
}
