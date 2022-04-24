/**
 * @packageDocumentation
 * @module API/Validator
 * How the sample should be validated in the input.
 */

const SAMPLE = {
  type: 'object',
  additionalProperties: false,
  properties: {
    name: {
      type: 'string',
      maxLength: 100,
      pattern: '^[A-Za-z0-9 ./]*$',
    },
    age: {
      type: 'integer',
      minimum: 0,
      maximum: 100,
    },
    someText: {
      type: 'string',
    },
    otherInfo: {
      type: 'object',
      additionalProperties: {
        type: 'string',
      },
      propertyNames: {
        pattern: '^[A-Za-z0-9 ./]*$',
      },
    },
  },
  required: ['name', 'age', 'someText'],
};

export default { SAMPLE };
