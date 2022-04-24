/**
 * It creates swagger documentation.
 */

import fs from 'fs';
import path from 'path';

import paramsChangedDocs from '../src/api/swagger';

const DOCS_LOCATION = '../docs/api/swagger/content.js';

const docsPath = path.join(__dirname, DOCS_LOCATION);

/**
 * Controls the files are OK to do the docs.
 * Throws an error if don't.
 */
const controlFiles = function controlFiles(): boolean {
  if (fs.existsSync(docsPath)) {
    fs.unlinkSync(docsPath);
  }
  return true;
};

/**
 * Generate API docs.
 */
const generateDocs = function generateDocs() {
  controlFiles();
  try {
    const stringifiedDoc = JSON.stringify(paramsChangedDocs);
    const fileContent = `var swaggerContent = ${stringifiedDoc};`;
    fs.writeFileSync(docsPath, fileContent, { encoding: 'utf8' });
  } catch (error) {
    throw new Error(`Error with Swagger files: ${error.message}`);
  }
};

console.log('Generating API docs.');
generateDocs();
console.log('API docs generated.');
