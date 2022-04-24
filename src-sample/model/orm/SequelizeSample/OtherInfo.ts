/**
 * @packageDocumentation
 * @module Model/ORM/SequelizeOtherInfo
 * It contains other info for the sample model.
 */

import { DataTypes } from 'sequelize';

import MODELS from '~/constants/model';
import sequelize from '~/model/db/sequelize';
import { CODES } from '~/errors';

const model = sequelize.define(
  MODELS.OTHER_INFO.NAME,
  {
    id: {
      field: 'id',
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    key: {
      field: 'key',
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: {
          args: [1, 100],
          msg: CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE,
        },
        is: {
          args: /^[a-zA-Z0-9., ]*$/i,
          msg: CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE,
        },
      },
    },
    value: {
      field: 'value',
      type: DataTypes.TEXT({ length: 'long' }),
      allowNull: false,
      validate: {
        len: {
          args: [0, 65535],
          msg: CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE,
        },
        is: {
          args: /^[a-zA-Z0-9., ¿?¡!]*$/i,
          msg: CODES.SAMPLE_OTHER_INFO_INVALID_KEY_OR_VALUE,
        },
      },
    },
  },
  {
    modelName: MODELS.OTHER_INFO.NAME,
    tableName: MODELS.OTHER_INFO.DB_TABLE_OR_COLLECTION,
    timestamps: true,
    underscored: true,
    charset: 'utf8',
  },
);
export default model;
