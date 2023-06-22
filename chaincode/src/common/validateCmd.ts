import Ajv, { ValidateFunction } from 'ajv';
import { BaseCommand } from '.';

export interface Validator {
  commands: string[];
  validateFunction: ValidateFunction;
}

/**
 * JSON Schema Validator
 */
 const ajv = new Ajv({
  verbose: true,
  allErrors: true,
});

export function makeValidator(schema: any): ValidateFunction {
  return ajv.compile(schema);
}

function isValid(validator: ValidateFunction, candidate: any) {
  const validationRes = validator(candidate);
  if (validationRes !== true) {
    console.error(validator.errors);
  }
  return validationRes === true;
}

export const validateCommand = (
  command: BaseCommand,
  validators: Validator[]
) => {
  // Find validator
  const validator = validators.find(v => {
    return v.commands.some((c: string) => c === command.name);
  });

  if (!validator) {
    throw "validation error"
  }

  // Use validator to validate command
  return isValid(validator.validateFunction, command);
};