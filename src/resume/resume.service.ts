import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from 'src/web-push/entities/resume.entity';
import { Repository } from 'typeorm';
import { ResponseResumeDto } from './dto/response-reservation.dto';
import { log } from 'console';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ResumeService {
  private readonly S3: AWS.S3;
  private readonly region: string;
  private readonly buketName: string;
  private readonly Lambda: AWS.Lambda;

  private params;
  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    private readonly configService: ConfigService,
  ) {
    this.S3 = new AWS.S3({
      accessKeyId: configService.get<string>('MY_AWS_ACCESS_KEY'),
      secretAccessKey: configService.get<string>('MY_AWS_SECRET_KEY'),
    });
    this.buketName = configService.get<string>('MY_AWS_S3_BUCKET');
    this.region = configService.get<string>('MY_AWS_REGION');

    AWS.config.update({
      credentials: {
        accessKeyId: configService.get<string>('MY_AWS_ACCESS_KEY'),
        secretAccessKey: configService.get<string>('MY_AWS_SECRET_KEY'),
      },
      region: configService.get<string>('MY_AWS_REGION'),
    });
    this.Lambda = new AWS.Lambda();
    this.params = {
      FunctionName: configService.get<string>('MY_AWS_LAMBDA_S3_FUNCTION_NAME'),
    };
  }
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
  async uploadFile(file) {
    log(file.originalname);

    log(this.region);
    return await this.s3_upload(
      file.buffer,
      this.buketName,
      'test.pdf',
      file.mimetype,
    );
  }

  async s3_upload(
    file,
    bucket,
    name,
    mimetype,
  ): Promise<AWS.S3.ManagedUpload.SendData> {
    const params = {
      Bucket: bucket,
      Key: String(name),
      Body: file,
      ContentType: mimetype,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: 'ap-northeast-2',
      },
    };
    return new Promise(async (resolve, reject) => {
      try {
        const s3Response = await this.S3.upload(params).promise();
        resolve(s3Response);
      } catch (err) {
        reject(err);
      }
    });
  }

  async convertText(): Promise<{ result: string }> {
    this.params.Payload = JSON.stringify({});
    return new Promise((resolve, rejects) => {
      this.Lambda.invoke(this.params, (err, data2) => {
        if (err) {
          return new InternalServerErrorException();
        }
        const result = JSON.parse(data2.Payload.toString()).body;
        log(result);
        resolve({ result });
      });
    });
  }
}
