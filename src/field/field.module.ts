import { Module } from '@nestjs/common';
import { FieldService } from './field.service';
import { FieldController } from './field.controller';
import { Field } from 'src/web-push/entities/field.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Field]), AuthModule],
  controllers: [FieldController],
  providers: [FieldService],
})
export class FieldModule {}
