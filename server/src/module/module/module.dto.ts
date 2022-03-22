import { IsString, IsInt, IsNumber } from 'class-validator';
import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';

class ModuleCreateDto {
  @IsString()
  name: string;
}

@Injectable()
export class ModuleDto extends CommonDto {
  create = ModuleCreateDto;
}
