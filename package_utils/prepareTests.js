/**
 * This script loads the environment variables, prevents running tests in production and proxy sequelize, mongoose, etc.
 */
import CONSTANTS from '../src/constants';

const MODEL_TEST_SUFFIX = '_test';
const MODELS = CONSTANTS.MODEL;

/**
 * Saves original collection name and add a suffix to collection name.
 */
const addSufixToModels = function addSufixToModels() {
  const modelKeys = Object.keys(MODELS);
  let tmpModel;
  modelKeys.forEach((key) => {
    tmpModel = MODELS[key];
    if (typeof tmpModel.ORIGINAL_MODEL_NAME === 'string') {
      return true;
    }
    tmpModel.ORIGINAL_MODEL_NAME = tmpModel.DB_TABLE_OR_COLLECTION;
    if (tmpModel.ORIGINAL_MODEL_NAME.endsWith(MODEL_TEST_SUFFIX)) {
      throw new Error(
        `One model table or collection ends with ${MODEL_TEST_SUFFIX}, which causes conflict with testing.`,
      );
    }
    tmpModel.DB_TABLE_OR_COLLECTION += MODEL_TEST_SUFFIX;
    return true;
  });
};

addSufixToModels();
