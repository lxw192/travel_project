import { IsString, IsInt } from 'class-validator';
import { CommonDto } from '../../core/commonDto';

export class OperateLogDto extends CommonDto {
  create: CreateDto;
}

class CreateDto {}
