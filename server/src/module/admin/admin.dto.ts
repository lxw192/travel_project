import { IsString } from 'class-validator';
import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';

export class AdminCreateDto {
  @IsString()
  name: string;
}

@Injectable()
export class AdminDto extends CommonDto {
  // create = CommonCreateDto
}
