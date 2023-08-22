import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('resumes')
export class Resume extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  resumeText: string;

  @Column()
  isVisuable: boolean;

  @ManyToOne(() => User, (User) => User.resumeId)
  User: User;

  @OneToMany(() => Comment, (Comment) => Comment.Resume)
  commentId: Comment;

  static of(resumeText: string, isVisuable: boolean): Resume {
    const resume: Resume = new Resume();

    resume.resumeText = resumeText;
    resume.isVisuable = isVisuable;

    return resume;
  }
}
