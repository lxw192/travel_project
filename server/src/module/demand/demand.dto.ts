import {
  IsNumberString,
  IsOptional,
  ValidateNested,
  MaxLength,
} from 'class-validator';
import { InfoDto } from './../../core/commonDto';
import { IsString, IsInt, IsNumber } from 'class-validator';
import { CommonDto, PageDto } from '../../core/commonDto';
import { IsNumberOrString } from '../../decorator/valid.decorator';
import { Type } from 'class-transformer';

export class DemandDto extends CommonDto {
  page = DemandPageDto;
  create = DemandCreateDto;
  update = DemandUpdateDto;
  status = DemandStatusDto;
}

export class DemandPageDto extends PageDto {}
export class DemandStatusDto {
  @IsNumber()
  id: number;
  @IsString()
  desc: string;
  @IsNumber()
  status: number;
}
export class DemandInfoDto extends InfoDto {
  @IsNumber()
  id: number;
  @IsString()
  desc: string;
  @IsNumber()
  status: number;
}

export class DemandCreateDto {
  @IsOptional()
  @IsNumber()
  type?: number;
  @IsString()
  name: string;
  @IsNumber()
  level: number;
  @IsOptional()
  @IsString()
  desc: string;
  @IsOptional()
  @IsNumber()
  siteType: number;
  @IsOptional()
  @IsNumber()
  status: number;
  @IsOptional()
  @IsNumber()
  productId: number;
  @IsOptional()
  @IsNumber()
  moduleId: number;
  @IsOptional()
  @IsString()
  prdUrl: string;
  @IsOptional()
  @IsString()
  uiUrl: string;
  @IsOptional()
  @IsString()
  interUrl: string;
  @IsOptional()
  @IsString()
  testCaseUrl: string;

  @IsOptional()
  @IsNumber()
  createUserId: number;
  @IsOptional()
  @IsNumber()
  productUserId: number;
  @IsOptional()
  @IsNumber()
  webUserId: number;
  @IsOptional()
  @IsNumber()
  serverUserId: number;
  @IsOptional()
  @IsNumber()
  testUserId: number;

  @IsOptional()
  @IsNumberOrString()
  demandStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  demandEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  uiStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  uiEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  devStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  devEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  webStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  webEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  serverStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  serverEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  jointStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  jointEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  testStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  testEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  preOnlineStartAt: string;
  @IsOptional()
  @IsNumberOrString()
  preOnlineEndAt: string;
  @IsOptional()
  @IsNumberOrString()
  onlineAt: string;

  @ValidateNested()
  @IsOptional()
  @Type(() => DemandUser)
  users: DemandUser[];
}
export class DemandUser {
  @IsNumberOrString()
  userId: number;
  @IsNumberOrString()
  deptId: number;
  @IsNumberOrString()
  startAt: string;
  @IsNumberOrString()
  endAt: string;
}

export class DemandUpdateDto extends DemandCreateDto {
  @IsNumberOrString()
  id: number;
}
