/**
 * @packageDocumentation
 * @module API/Validator
 * It contains the schema validation.
 */

import Ajv from 'ajv';

import { CodedError } from '~/errors';
import validations from './validations';

const ajv = new Ajv({ removeAdditional: true, useDefaults: true });

type JSONType = Record<string, unknown>;
type ValidationDictType = Record<string, Ajv.ValidateFunction>;

/**
 * Validator against JSON schema.
 */
class Validator {
  private _schemaValidators: ValidationDictType = {};

  /**
   * Loads all the schemas.
   */
  constructor() {
    const validationJSONS: Record<string, Record<string, unknown>> = { ...validations };
    let schemaJSON = {};
    Object.keys(validations).forEach((validation) => {
      schemaJSON = validationJSONS[validation];
      this._schemaValidators[validation] = ajv.compile(schemaJSON);
    });
  }

  /**
   * Validates the sent data against the specified schema.
   * @param data JSON data to validate.
   * @param schema Schema to be validated against.
   */
  async validate(data: JSONType, schema: keyof typeof validations): Promise<JSONType> {
    const validationFunction = this._schemaValidators[schema];
    const isValid = validationFunction(data);
    if (!isValid) {
      throw new CodedError('API_INVALID_PARAMS');
    }
    return data;
  }
}

export default new Validator();
