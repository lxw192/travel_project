import {
  IsNumber,
  IsOptional,
  IsString,
  IsNumberString,
} from 'class-validator';

export class CommonDto {
  page = PageDto;
  list = null;
  info = InfoDto;
  create = null;
  update = null;
  save = null;
  status = null;
  delete = DeleteDto;
  count = null;
  patch = null;
}

export class EmptyDto {}

export class PageDto {
  @IsOptional()
  @IsNumberString()
  page?: number;
  @IsOptional()
  @IsNumberString()
  pageSize?: number;
  @IsOptional()
  @IsNumberString()
  ts?: number;
  @IsOptional()
  '^created_at'?: number;
}

export class InfoDto {
  @IsNumberString()
  id: number;
}

export class DeleteDto {
  @IsNumberString()
  id: number;
}

// export class UpdateDto {
//   @IsNumberString()
//   id: number;
// }
