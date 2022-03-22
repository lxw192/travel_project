import { reqDataValid } from '../utils/reqDataValid';
import { Http } from './../common/Http';
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    await reqDataValid(metatype, value);
    const object = plainToClass(metatype, value);
    console.log(
      'ValidationPipe -> transform -> metatype, value',
      metatype,
      value,
    );
    const errors = await validate(object);
    if (errors.length > 0) {
      console.log('ValidationPipe -> transform -> errors', errors);
      Http.failThrow(2001, errors);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
