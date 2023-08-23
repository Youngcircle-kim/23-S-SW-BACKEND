import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from 'src/web-push/entities/resume.entity';
import { Repository } from 'typeorm';
import { ResponseResumeDto } from './dto/response-reservation.dto';

@Injectable()
export class ResumeService {
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
  ) {}
  async create(createResumeDto: CreateResumeDto) {
    const newResume: Resume = Resume.of(
      createResumeDto.resumeText,
      createResumeDto.isVisuable,
      createResumeDto.user,
    );

    try {
      const savedResume = await this.resumeRepository.save(newResume);

      return 'Success create new Field';
    } catch (err) {
      console.error(err);
      return 'Fail look at the console';
    }
  }

  async findAll() {
    const resumes: Resume[] = await this.resumeRepository.find({
      relations: {
        User: true,
      },
    });

    return resumes.map(ResponseResumeDto.from);
  }

  async findOne(id: number) {
    const resume: Resume = await this.resumeRepository.findOne({
      where: { id },
      relations: {
        User: true,
      },
    });

    if (resume === null) {
      throw new NotFoundException();
    }
    return ResponseResumeDto.from(resume);
  }

  async update(id: number, updateResumeDto: UpdateResumeDto) {
    const resume: Resume = await this.resumeRepository.findOne({
      where: { id },
      relations: {
        User: true,
      },
    });
    if (updateResumeDto.resumeText !== null) {
      resume.resumeText = updateResumeDto.resumeText;
    }

    if (updateResumeDto.isVisuable !== null) {
      resume.isVisuable = updateResumeDto.isVisuable;
    }

    return `This action updates a #${id} resume`;
  }

  async remove(id: number) {
    const resume: Resume = await this.resumeRepository.findOne({
      where: { id },
      relations: {
        User: true,
      },
    });
    this.resumeRepository.remove(resume);
    return `This action removes a #${id} resume`;
  }
}
