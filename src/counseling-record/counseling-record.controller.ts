import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CounselingRecordService } from './counseling-record.service';
import { CreateCounselingRecordDto } from './dto/create-counseling-record.dto';
import { UpdateCounselingRecordDto } from './dto/update-counseling-record.dto';

@Controller('counseling-record')
export class CounselingRecordController {
  constructor(
    private readonly counselingRecordService: CounselingRecordService,
  ) {}

  @Post()
  create(@Body() createCounselingRecordDto: CreateCounselingRecordDto) {
    return this.counselingRecordService.create(createCounselingRecordDto);
  }

  @Get()
  findAll() {
    return this.counselingRecordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.counselingRecordService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCounselingRecordDto: UpdateCounselingRecordDto,
  ) {
    return this.counselingRecordService.update(+id, updateCounselingRecordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.counselingRecordService.remove(+id);
  }
}
