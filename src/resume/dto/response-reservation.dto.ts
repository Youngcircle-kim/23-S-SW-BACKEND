import { Resume } from 'src/web-push/entities/resume.entity';

export class ResponseResumeDto {
  private readonly resumeId: number;

  readonly resumeText: string;

  readonly isVisuable: boolean;

  readonly userId: number;

  readonly title: string;

  readonly createdAt: Date;

  readonly name: string;

  readonly image: string;

  constructor(
    resumeId: number,
    resumeText: string,
    isVisuable: boolean,
    userId: number,
    title: string,
    createdAt: Date,
    name: string,
    image: string,
  ) {
    this.resumeId = resumeId;
    this.resumeText = resumeText;
    this.isVisuable = isVisuable;
    this.userId = userId;
    this.title = title;
    this.name = name;
    this.createdAt = createdAt;
    this.image = image;
  }

  static from(resume: Resume): ResponseResumeDto {
    const userId = resume.userId.id;
    const name = resume.userId.name;
    const image = resume.userId.image;
    return new ResponseResumeDto(
      resume.id,
      resume.resumeText,
      resume.isVisuable,
      userId,
      resume.title,
      resume.createdAt,
      name,
      image,
    );
  }
}
