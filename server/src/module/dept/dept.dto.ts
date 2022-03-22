import { IsString, IsInt, IsNumber } from 'class-validator';
import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';

class DeptCreateDto {
  @IsString()
  name: string;
}

@Injectable()
export class DeptDto extends CommonDto {
  create = DeptCreateDto;
}
