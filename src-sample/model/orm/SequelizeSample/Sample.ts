/**
 * @packageDocumentation
 * @module Model/ORM/SequelizeSample
 * It contains a sample model.
 */

import { DataTypes } from 'sequelize';

import MODELS from '~/constants/model';
import { CODES } from '~/errors';
import sequelize from '~/model/db/sequelize';

const model = sequelize.define(
  MODELS.SAMPLE.NAME,
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      field: 'sample_name',
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
      validate: {
        len: {
          args: [3, 100],
          msg: CODES.SAMPLE_NAME_BAD_LENGTH,
        },
        is: {
          args: /^[a-zA-Z0-9. ]*$/i,
          msg: CODES.SAMPLE_NAME_NOT_VALID,
        },
      },
    },
    age: {
      field: 'age',
      type: DataTypes.INTEGER({ length: 100 }),
      allowNull: false,
      validate: {
        max: {
          args: [110],
          msg: CODES.SAMPLE_AGE_NOT_VALID,
        },
        min: {
          args: [0],
          msg: CODES.SAMPLE_AGE_NOT_VALID,
        },
      },
    },
    someText: {
      field: 'some_text',
      type: DataTypes.TEXT({ length: 'long' }),
      allowNull: false,
      defaultValue: 'None.',
      validate: {
        is: {
          args: /^[a-zA-Z0-9., ¡!¿?]*$/i,
          msg: CODES.SAMPLE_TEXT_NOT_VALID,
        },
      },
    },
  },
  {
    modelName: MODELS.SAMPLE.NAME,
    tableName: MODELS.SAMPLE.DB_TABLE_OR_COLLECTION,
    timestamps: true,
    underscored: true,
    charset: 'utf8',
    //    indexes: [{ fields: ['sample_name'] }],
  },
);

export default model;
