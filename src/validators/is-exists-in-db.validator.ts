import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { getRepository } from 'typeorm';

@ValidatorConstraint({ async: true })
export class IsExistsInDBConstraint implements ValidatorConstraintInterface {
  async validate(id: any, args: ValidationArguments) {
    const exists = await getRepository(args.constraints[0]).findOne({
      where: {
        [`${args.constraints[1]}`]: id,
      },
    });
    return exists != null;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    return validationArguments.property + ' Exists Constraints';
  }
}

export function IsExistsInDB(
  entity,
  columnName?: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [entity, columnName ?? propertyName],
      validator: IsExistsInDBConstraint,
    });
  };
}
