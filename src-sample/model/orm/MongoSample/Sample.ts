/**
 * @packageDocumentation
 * @module Model/ORM/MongoSample
 * It contains  the mongo sample model.
 */

import mongoose from 'mongoose';

import MODELS from '~/constants/model';
import { CODES } from '~/errors';

const { Schema } = mongoose;

const schemaSample = new Schema(
  {
    _id: Schema.Types.ObjectId,
    name: {
      type: Schema.Types.String,
      unique: true,
      required: [true, CODES.SAMPLE_NAME_EXISTS],
      minlength: [3, CODES.SAMPLE_NAME_BAD_LENGTH],
      maxlength: [100, CODES.SAMPLE_NAME_BAD_LENGTH],
      validate: {
        validator: (v: string) => /^[a-z0-9. ]*$/i.test(v),
        message: CODES.SAMPLE_NAME_NOT_VALID,
      },
    },
    age: {
      type: Schema.Types.Number,
      required: [true, CODES.SAMPLE_AGE_NOT_VALID],
      min: [0, CODES.SAMPLE_AGE_NOT_VALID],
      max: [110, CODES.SAMPLE_AGE_NOT_VALID],
    },
    someText: {
      type: Schema.Types.String,
      default: 'None.',
      validate: {
        validator: (v: string) => /^[a-z0-9. ¡!¿?]*$/i.test(v),
        message: CODES.SAMPLE_TEXT_NOT_VALID,
      },
    },
    otherInfo: {
      type: Schema.Types.ObjectId,
      ref: MODELS.OTHER_INFO.NAME,
    },
  },
  {
    autoIndex: true,
    autoCreate: true,
    collection: MODELS.SAMPLE.DB_TABLE_OR_COLLECTION,
    strict: true,
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
  },
);

const index = { name: 'text', someText: 'text' };
schemaSample.index(index, { default_language: 'none' });
const model = mongoose.model(MODELS.SAMPLE.NAME, schemaSample);
export default model;
