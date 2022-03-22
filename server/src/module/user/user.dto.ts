import { IsNumberOrString } from '../../decorator/valid.decorator';
import { IsString, IsNumber, IsOptional } from 'class-validator';
import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserDto extends CommonDto {
  create = UserCreateDto;
}

export class UserCreateDto {
  @IsString()
  name: string;
  @IsString()
  pass: string;
  @IsOptional()
  @IsNumber()
  deptId: number;
  @IsOptional()
  @IsNumber()
  roleId: number;
}

export class UserLoginDto {
  @IsString()
  name: string;
  @IsString()
  pass: string;
}

export class UserEditPassDto {
  @IsString()
  name: string;
  @IsString()
  originPass: string;
  @IsString()
  pass: string;
}

export class UserEditPassOtherDto {
  @IsString()
  name: string;
  @IsString()
  pass: string;
}

export class UserTaskListDto {
  @IsOptional()
  @IsNumberOrString()
  userId: string;
  @IsOptional()
  @IsNumberOrString()
  deptId: string;
}
