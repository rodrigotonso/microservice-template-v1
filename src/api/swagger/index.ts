/**
 * @packageDocumentation
 * @module API/Swagger
 * Contains the swagger documentation.
 * It parses the YAML and make a JSON with the new content.
 */

import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';
import yamljs from 'yamljs';
import { cloneDeep, isObject, isNull, escapeRegExp } from 'lodash';

import ROUTES from '~/constants/routes';
import { CODES as ERROR_CODES } from '~/errors';

type SwaggerDocs = Record<string, unknown>;
type SwaggerPaths = Record<string, unknown>;

const { API } = ROUTES;

const docPath = path.join(__dirname, 'swagger.yml');
if (!fs.existsSync(docPath)) {
  throw new Error('File "swagger.yml" doesn\'t exist');
}

/**
 * Receives an Express path (with :id) and returns a swagger path (with {id}).
 */
const changeExpressPathToSwaggerPath = function changeExpressPathToSwaggerPath(
  expressPath: string,
): string {
  const pathParts = expressPath.split('/');
  const modifiedParts = pathParts.map((part) => {
    if (!part.startsWith(':')) {
      return part;
    }
    const newPart = part.replace(':', '');
    return `{${newPart}}`;
  });
  return modifiedParts.join('/');
};

/**
 * Converts express notations from "express" (:something) to "swagger" ({something}).
 */
const convertExpressToSwagger = function convertExpressToSwagger(
  swaggerDocs: Record<string, unknown>,
) {
  if (!isObject(swaggerDocs.paths) || isNull(swaggerDocs.paths)) {
    return swaggerDocs;
  }
  const docs = cloneDeep(swaggerDocs);
  const paths: SwaggerPaths = <SwaggerPaths>docs.paths;
  let tmpNewKey = '';
  Object.keys(paths).forEach((key) => {
    tmpNewKey = changeExpressPathToSwaggerPath(key);
    if (tmpNewKey === key) {
      return;
    }
    paths[tmpNewKey] = paths[key];
    delete paths[key];
  });
  docs.paths = paths;
  return docs;
};

let swaggerDoc: SwaggerDocs = {};

try {
  const yaml = fs.readFileSync(docPath, { encoding: 'utf8' });
  const match = yaml.match(/\$\{.+?\}/g);
  let yamlForHB = yaml;
  if (match !== null) {
    match.forEach((subMatch) => {
      const replace = subMatch.replace(/\$\{/, '{{').replace(/\}/, '}}');
      yamlForHB = yamlForHB.replace(new RegExp(escapeRegExp(subMatch)), replace);
    });
  }
  const yamlCompiled = Handlebars.compile(yamlForHB);
  const yamlReplaced = yamlCompiled({ ROUTES, API, ERROR_CODES });
  swaggerDoc = yamljs.parse(yamlReplaced);
  swaggerDoc = convertExpressToSwagger(swaggerDoc);
} catch (error) {
  throw new Error(`Error with Swagger files: ${error.message}`);
}

export default { ...swaggerDoc };
