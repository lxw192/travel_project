import { CommonDto } from '../../core/commonDto';
import { Injectable } from '@nestjs/common';
import { IsOptional, IsString } from 'class-validator';

@Injectable()
export class FeatureToggleDto extends CommonDto {
  create = CreateFeatureToggleDto;
}

export class CreateFeatureToggleDto {
  // 特性开关名称
  @IsString()
  name: string;
  @IsOptional()
  status: string;

  // 标识
  @IsString()
  moduleKey: string;

  // 所属视图
  @IsOptional()
  @IsString()
  viewId: string;
  @IsString()
  viewUrl: string;
  
  // 维护人
  @IsString()
  maintainer: string;

  // 版本
  @IsString()
  version: string;

  // 所属项目
  @IsOptional()
  @IsString()
  productId: string;
  @IsString()
  productName: string;

  // 所属项目
  @IsOptional()
  @IsString()
  teamId: string;
  @IsOptional()
  @IsString()
  teamName: string;

  @IsOptional()
  @IsString()
  environment: string;
}
