import { IsString } from 'class-validator';
import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';

class RoleCreateDto {
  @IsString()
  name: string;
}

@Injectable()
export class RoleDto extends CommonDto {
  create = RoleCreateDto;
}
