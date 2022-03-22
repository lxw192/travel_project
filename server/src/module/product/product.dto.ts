import { IsString } from 'class-validator';
import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';

class ProductCreateDto {
  @IsString()
  name: string;
}

@Injectable()
export class ProductDto extends CommonDto {
  create = ProductCreateDto;
}
