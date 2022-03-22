import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { Http } from '../common/Http';

export async function reqDataValid(DtoClass, data) {
  let object = plainToClass(DtoClass, data);
  const errors: ValidationError[] = await validate(object, {
    whitelist: true,
    forbidNonWhitelisted: true,
    // forbidUnknownValues: true,
  });
  if (errors.length > 0) {
    Http.failThrow(1100, '参数错误', errors);
  }
}
