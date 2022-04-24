/**
 * @packageDocumentation
 * @module Model/ORM/MongoOtherInfo
 * Contains the mongo schema for other information.
 */

import mongoose from 'mongoose';

import CONSTS from '~/constants/model';
import { CODES } from '~/errors';

const { Schema } = mongoose;

const schemaSample = new Schema(
  {
    _id: Schema.Types.ObjectId,
    sample: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: CONSTS.SAMPLE.NAME,
    },
    properties: [
      {
        key: {
          type: Schema.Types.String,
          required: [true, CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE],
          minlength: [3, CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE],
          maxlength: [100, CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE],
          validate: {
            validator: (v: string) => /^[a-z0-9. ]*$/i.test(v),
            message: CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE,
          },
        },
        value: {
          type: Schema.Types.String,
          required: [true, CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE],
          maxlength: [65535, CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE],
          validate: {
            validator: (v: string) => /^[a-z0-9., ¡!¿?]*$/i.test(v),
            message: CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE,
          },
        },
      },
    ],
  },
  {
    autoIndex: true,
    autoCreate: true,
    collection: CONSTS.OTHER_INFO.DB_TABLE_OR_COLLECTION,
    strict: true,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const index = { 'properties.key': 'text', 'properties.value': 'text' };
schemaSample.index(index, { default_language: 'none' });
const model = mongoose.model(CONSTS.OTHER_INFO.NAME, schemaSample);
export default model;
