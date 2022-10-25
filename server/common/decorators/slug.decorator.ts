import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from "class-validator";

@ValidatorConstraint({ name: "IsSlug" })
class IsSlugConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return value?.match(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} has invalid format`;
  }
}

export const IsSlug = (validationOptions?: ValidationOptions) => (object: any, propertyName: string) => {
  registerDecorator({
    target: object.constructor,
    propertyName,
    options: validationOptions,
    constraints: [],
    validator: IsSlugConstraint
  });
};
