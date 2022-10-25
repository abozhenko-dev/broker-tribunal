import { ValidationPipeOptions } from "@nestjs/common";

export const validatorConfig: ValidationPipeOptions = { transform: true, validateCustomDecorators: true };
