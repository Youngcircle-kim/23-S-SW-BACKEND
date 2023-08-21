import { BaseTimeEntity } from 'src/common/entities/BaseTimeEntity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Resume } from './resume.entity';
import { User } from './user.entity';

@Entity('comments')
export class Comment extends BaseTimeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  major: number;

  @ManyToOne(() => User, (User) => User.commentId)
  User: User;

  @ManyToOne(() => Resume, (Resume) => Resume.commentId)
  Resume: Resume;

  static of(email: string, major: number): Comment {
    const comment: Comment = new Comment();

    comment.email = email;
    comment.major = major;

    return comment;
  }
}
