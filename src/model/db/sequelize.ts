/**
 * @packageDocumentation
 * @module Model/Database
 * It has the access to sequelize.
 * You should provide the database connected to.
 */

import { Sequelize } from 'sequelize';
import moment from 'moment';

import CONFIG from '~/config';

const { SQL } = CONFIG.DB;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const dialect: any = SQL.DIALECT;

/**
 * Sequelize connection.
 */
const sequelize = new Sequelize(SQL.DATABASE, SQL.USERNAME, SQL.PASSWORD, {
  host: SQL.HOST,
  dialect,
  // storage: ':memory:', // <- If SQLite is used...
  timezone: moment().format('Z'),
  sync: {
    force: false,
  },
  pool: {
    max: 10,
    min: 1,
  },
  define: {
    charset: 'utf8',
  },
  logging: false,
});

export default sequelize;
