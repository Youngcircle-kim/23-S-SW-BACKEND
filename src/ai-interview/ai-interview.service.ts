import { ConfigService } from '@nestjs/config';
import { Injectable, Body, InternalServerErrorException } from '@nestjs/common';
import { ResumeService } from 'src/resume/resume.service';
import { error, log } from 'console';
import * as AWS from 'aws-sdk';
import { resolve } from 'path';
import { rejects } from 'assert';
import { InjectRepository } from '@nestjs/typeorm';
import { Resume } from 'src/web-push/entities/resume.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AiInterviewService {
  private questions: string[] = [];
  private readonly Lambda: AWS.Lambda;
  private params;

  constructor(
    @InjectRepository(Resume)
    private readonly resumeRepository: Repository<Resume>,
    private readonly configService: ConfigService,
  ) {
    AWS.config.update({
      credentials: {
        accessKeyId: configService.get<string>('MY_AWS_ACCESS_KEY'),
        secretAccessKey: configService.get<string>('MY_AWS_SECRET_KEY'),
      },
      region: configService.get<string>('MY_AWS_REGION'),
    });
    this.Lambda = new AWS.Lambda();
    this.params = {
      FunctionName: configService.get<string>(
        'MY_AWS_LAMBDA_GPT_FUNCTION_NAME',
      ),
    };
  }

  async gptInterview(
    role: string,
    userId: number,
  ): Promise<{ role: string; content: string }> {
    return new Promise(async (resolve, rejects) => {
      const resume = await this.resumeRepository
        .createQueryBuilder('resume')
        .where('resume.userId = :userId', { userId })
        .getOne();
      log(resume);
      const content: string = resume.resumeText;
      resolve({ role, content });
    });
  }

  async sendResumeToGPT(data: { role: string; content: string }): Promise<any> {
    this.params.Payload = JSON.stringify({ body: data });
    return new Promise((resolve, rejects) => {
      this.Lambda.invoke(this.params, (err, data2) => {
        if (err) {
          return new InternalServerErrorException();
        }

        const parsedData = JSON.parse(data2.Payload.toString()).body;

        this.questions = JSON.parse(parsedData).filter(
          (item) => !item.startsWith('{') && !item.endsWith('}'),
        );
        log(this.questions);
        resolve(this.questions);
      });
    });
  }
}
