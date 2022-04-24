/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */
/**
 * Testing sequelize API.
 */
// eslint-disable-next-line import/no-extraneous-dependencies
import supertest from 'supertest';

import app from '../../../src/app';
import { getAuthHeader } from './api';
import CONSTANTS from '../../../src/constants';
import sequelize from '../../../src/model/db/sequelize';
import sequelizeSample from '../../../src/model/actions/sequelize';
import data from '../data';

type Payload = unknown;

jest.setTimeout(30000);

const APITester = supertest(app);
const { ROUTES } = CONSTANTS;
const auth = getAuthHeader();

/**
 * Converts the object to something showable.
 */
const getPayloadOrError = function getPayloadOrError(response: string): Payload {
  const result = JSON.parse(response);
  if (result.success === true) {
    return result.payload;
  }
  throw new Error(`Error: ${response}`);
};

/**
 * Converts sample and other info to API body,
 */
const convertToAPIBody = function convertToAPIBody(sampleData: any): Record<string, unknown> {
  return { ...sampleData.sample, otherInfo: sampleData.otherInfo };
};

/**
 * Adds some samples to database.
 */
const addSomeSamples = async function addSomeSample(): Promise<boolean> {
  const add = (newData: any) =>
    new Promise((resolve) => {
      APITester.post(ROUTES.API.SEQUELIZE.SAMPLE)
        .set(auth.key, auth.value)
        .send(convertToAPIBody(newData))
        .end(() => resolve(true));
    });
  await add(data[0]);
  await add(data[1]);
  return true;
};

/**
 * Gets the route for a deletion.
 */
const getDeleteRoute = function getDeleteRoute(name: string): string {
  const sampleName = encodeURI(name);
  return ROUTES.API.SEQUELIZE.DELETE_ONE.replace(':name', sampleName);
};

describe('Testing sequelize API', () => {
  beforeAll(async (done) => {
    return new Promise(() => app.on('started', done));
  });

  beforeEach(async () => sequelizeSample.empty());

  afterAll(async () => {
    await sequelizeSample.drop();
    await sequelize.close();
  });

  test('Adding information to the database (sequelize.add)', async (done) => {
    APITester.post(ROUTES.API.SEQUELIZE.SAMPLE)
      .set(auth.key, auth.value)
      .send(convertToAPIBody(data[0]))
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        const result = getPayloadOrError(res.text);
        expect(typeof result).toBe('object');
        done();
      });
  });

  test('Counting samples from the database (sequelize.count)', async (done) => {
    await addSomeSamples();
    APITester.get(ROUTES.API.SEQUELIZE.COUNT)
      .set(auth.key, auth.value)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        const result = getPayloadOrError(res.text);
        expect(result).toBe(2);
        done();
      });
  });

  test('Getting all the results from the database (sequelize.getAll)', async (done) => {
    await addSomeSamples();
    APITester.get(ROUTES.API.SEQUELIZE.ALL_SAMPLES)
      .set(auth.key, auth.value)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        const result = getPayloadOrError(res.text);
        expect(Array.isArray(result)).toBe(true);
        done();
      });
  });

  test('Deleting one result from the database (sequelize.delete)', async (done) => {
    const deletionRoute = getDeleteRoute(data[0].sample.name);
    await addSomeSamples();
    await APITester.delete(deletionRoute).set(auth.key, auth.value);
    APITester.get(ROUTES.API.SEQUELIZE.COUNT)
      .set(auth.key, auth.value)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        const result = getPayloadOrError(res.text);
        expect(result).toBe(1);
        done();
      });
  });

  test('Emptying the entries from the database (sequelize.empty)', async (done) => {
    await addSomeSamples();
    await APITester.delete(ROUTES.API.SEQUELIZE.ALL_SAMPLES).set(auth.key, auth.value);
    APITester.get(ROUTES.API.SEQUELIZE.COUNT)
      .set(auth.key, auth.value)
      .expect(200)
      .end((err, res) => {
        if (err) {
          done(err);
          return;
        }
        const result = getPayloadOrError(res.text);
        expect(result).toBe(0);
        done();
      });
  });
});
