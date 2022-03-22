import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  buildMessage,
} from 'class-validator';
import ValidatorJS from 'validator';

export function IsNumberOrString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isNumberOrString',
      target: object.constructor,
      propertyName: propertyName,
      // constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return (
            typeof value === 'number' ||
            (typeof value === 'string' && ValidatorJS.isNumeric(value))
          );
        },
        defaultMessage: buildMessage(
          (eachPrefix) => eachPrefix + '$property must be a number or string',
          validationOptions,
        ),
      },
    });
  };
}
