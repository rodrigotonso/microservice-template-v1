/**
 * @packageDocumentation
 * @module API/GraphQL
 * Contains the GraphQL middleware.
 */

import fs from 'fs';
import path from 'path';
import { buildSchema } from 'graphql';
import { graphqlHTTP } from 'express-graphql';

import CONFIG from '~/config';
import testHandler from './handlers/testHandler';

const { API_USE_GRAPHIQL } = CONFIG;

const schemaPath = path.join(__dirname, 'schemas.gql');
const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
const schema = buildSchema(schemaContent);

// TODO: Add here the needed handlers, like the API in API routes.
const rootValue = {
  hello: testHandler.hello,
  bye: testHandler.bye,
  randomNumbers: testHandler.randomNumbers,
};

/**
 * Contains the graphQL Http.
 */
export const graphHttp = graphqlHTTP({ schema, rootValue, graphiql: API_USE_GRAPHIQL });

export default graphHttp;
