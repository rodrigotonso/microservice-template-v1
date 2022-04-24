/**
 * CAN START THE APLICATION WITH PM2.
 * Just with pm2 start pm2.config.js
 *
 * Docs available: https://pm2.keymetrics.io/
 *
 */

const dotenv = require('dotenv');
const path = require('path');

const envVars = dotenv.config();
if (envVars.error) {
  throw envVars.error;
}
const dirName = __dirname.split(path.sep).pop();

const APP_NAME = envVars.parsed.APP_NAMER || dirName;

// TODO:
// Config how many instances do you want!!

module.exports = {
  apps: [
    {
      name: APP_NAME,
      script: './build/index.js',
      node_args: '-r dotenv/config',
      exec_mode: 'cluster',
      instances: 'max',
    },
  ],
};
