/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * @packageDocumentation
 * @module Model/ErrorHandler
 * Handles the different errors from the model.
 */
import { isObject } from 'lodash';

import { CodedError } from '~/errors';

/**
 * Handles validation errors.
 * @param error Validation error recevied.
 */
const handleValidationError = function handleValidationError(error: any): void {
  if (Array.isArray(error.errors)) {
    const firstError = error.errors[0];
    throw new CodedError(firstError.message, [], { error });
  }
  if (isObject(error.errors)) {
    const firstError = Object.keys(error.errors).shift();
    if (!firstError) {
      throw new CodedError('NOT_DEFINED', [], { error });
    }
    const message = error.errors[firstError].message || 'Message in model not assigned!';
    throw new CodedError(message, [], { error });
  }
};

/**
 * Handles the error. Probably changing it before rethrowing it.
 * @param error Error recevied.
 */
const handleError = function handleError(error: any): never {
  if (CodedError.isCodedError(error)) {
    throw error;
  }

  if (!isObject(error)) {
    throw new CodedError('NOT_DEFINED', [], { error });
  }

  handleValidationError(error);

  const normalError = error as Error;
  if (!normalError) {
    throw new CodedError('NOT_DEFINED', [], { error });
  }
  throw CodedError.fromError(normalError);
};

export default handleError;
